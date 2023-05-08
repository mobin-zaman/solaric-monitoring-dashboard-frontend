import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { postProject } from "@/lib/Helper";

export default function AddUserModal({ addUserModalOpen, newUserCreated }) {

  const [name, setName] = useState('');
  const [solarmanPlantId, setSolarmanPlantId] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation(postProject, {
    onSuccess: () => {
      newUserCreated(true);
      addUserModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const addNewUser = (e) => {
    newUserCreated(false);
    setErrorMessage('');
    if(!name || !solarmanPlantId) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    mutation.mutate({
      name,
      solarmanPlantId : parseInt(solarmanPlantId),
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
          <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[20] sm:w-[26rem] sm:h-[20rem]">
            <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-2xl">Add New Project</span>
              <button className="opacity-80" onClick={() => addUserModalOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="flex flex-col">
            <div className=" text-[#373737] font-medium text-sm space-x-1">
            <div className="font-medium text-lg">Name</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Solarman Plant Id</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="number"
              placeholder="Enter Solarman Plant Id"
              value={solarmanPlantId}
              onChange={(e) => setSolarmanPlantId(e.target.value)}
            /></div>
          </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-red-700 text-sm">{errorMessage === "The email address is already in use by another account." ? "The email address is already used." : errorMessage}</div>
              <button className="px-2.5 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md" onClick={addNewUser}>
                Add Project
              </button>
            </div>
          </div>
      </div>
    </>
  );
}
