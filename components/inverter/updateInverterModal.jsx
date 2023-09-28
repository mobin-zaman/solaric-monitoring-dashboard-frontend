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
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-700 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-700 rounded-t-md px-6 py-3">
            <span className="text-gray-200 font-semibold text-lg">
              Inverter Update
            </span>
            <button
              className="opacity-80"
              onClick={() => editInverterModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-gray-200" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
            <div className="text-gray-800 text-sm font-semibold bg-gray-200 px-2 h-8 flex items-center justify-center rounded-md space-x-1 shadow-md">
              <span>Device Serial Number:</span>
              <span>{editInverterData?.deviceSn}</span>
            </div>

            <div className="flex flex-col space-y-5">
              <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  Capacity
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                  <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="number"
                    placeholder="Enter capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  Code
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                  <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  Note
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                  <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
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
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none"
                onClick={handleAddUser}
              >
                {" "}
                <FontAwesomeIcon icon={faPenToSquare} />
                <span className="">Update Meter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
