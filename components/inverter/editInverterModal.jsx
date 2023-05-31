import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateInverter } from "@/lib/Helper";

export default function AddUserModal({
  editInverterModalOpen,
  inverterEdited,
  editInverterData,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [capacity, setCapacity] = useState(editInverterData?.capacity || "");
  const [code, setCode] = useState(editInverterData?.code || "");
  const [note, setNote] = useState(editInverterData?.note || "");

  const mutation = useMutation(updateInverter, {
    onSuccess: () => {
      inverterEdited(true);
      editInverterModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    // userEdited(false);
    // setErrorMessage("");
    // if (!capacity || !code) {
    //   setErrorMessage("Please fill all the fields");
    //   return;
    // }

    // console.log(capacity, parseInt(capacity));

    mutation.mutate({
      inverterId: parseInt(editInverterData?.id),
      capacity: parseFloat(capacity),
      code: code,
      note: note,
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start select-none">
            <span className="text-[#25476A] font-semibold text-2xl">
              Inverter
            </span>
            <div className="text-[#25476A] text-sm font-medium bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                  <span>Device Serial Number:</span>
                  <span>{editInverterData?.deviceSn}</span>
                </div>
                </div>
            <button
              className="opacity-80"
              onClick={() => editInverterModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="text-[#373737] font-medium text-sm space-x-1">
              <div className="font-medium text-lg text-[#25476A]">Capacity</div>
              <div className="flex items-center border-b-2 border-[#25476A]">
                <input
                  className="w-full h-10 text-md text-[#25476A] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="number"
                  placeholder="Enter capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>

            <div className="text-[#373737] font-medium text-sm space-x-1">
              <div className="font-medium text-lg text-[#25476A]">Code</div>
              <div className="flex items-center border-b-2 border-[#25476A]">
                <input
                  className="w-full h-10 text-md text-[#25476A] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>

            <div className="text-[#373737] font-medium text-sm space-x-1">
              <div className="font-medium text-lg text-[#25476A]">Note</div>
              <div className="flex items-center border-b-2 border-[#25476A]">
                <input
                  className="w-full h-10 text-md text-[#25476A] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  placeholder="Enter note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-red-700 text-sm">
              {errorMessage ===
              "The email address is already in use by another account."
                ? "The email address is already used."
                : errorMessage}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-2"
              onClick={handleAddUser}
            >
              <span>Edit</span>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
