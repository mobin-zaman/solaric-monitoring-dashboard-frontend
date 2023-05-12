import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { addInverterToBuilding } from "@/lib/Helper";

export default function AddUserModal({ addCompanyModalOpen, buildingId, userAdded }) {
  const [inverterId, setInverterId] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(addInverterToBuilding, {
    onSuccess: () => {
      userEdited(true);
      addCompanyModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    // userEdited(false);
    setErrorMessage("");
    if (!inverterId) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    mutation.mutate({
      buildingId: parseInt(buildingId),
      inverterId: parseInt(inverterId),
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] sm:w-[26rem] space-y-3">
          <div className="flex justify-between">
            <span className="text-[#373737] font-semibold text-xl">
              Add Inverter In Building {buildingId}
            </span>
            <button
              className="opacity-80"
              onClick={() => addCompanyModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            <div className=" text-[#373737] font-medium text-sm space-x-1">
              <div className="font-medium text-lg text-[#39B54A]">Inverter Id</div>
              <div className="flex items-center border-b-2 border-[#168636]">
                <input
                  className="w-full h-10 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Enter inverter id"
                  value={inverterId}
                  onChange={(e) => setInverterId(e.target.value)}
                />
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
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md"
              onClick={handleAddUser}
            >
              Add Inverter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
