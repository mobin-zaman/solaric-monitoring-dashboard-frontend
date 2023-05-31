import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "@/lib/Helper";
import { useMutation } from "react-query";
import { useState } from "react";

export default function DeleteProjectModal({
  deleteProjectModalOpen,
  deleteProjectData,
  projectDeleted,
}) {

  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(deleteProject, {
    onSuccess: () => {
      userDeleted(true);
      deleteUserModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage("Something went wrong");
    }
  });

  const handleDeleteUser = (id) => {
    console.log(id);
    mutation.mutate(parseInt(id));
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        {/* <div className="grid grid-cols-1 bg-[#25476A] rounded-md items-center relative mx-auto p-5 space-y-4"> */}
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
            <span className="text-[#25476A] font-semibold text-lg">
              Project
            </span>
            <button
              className="opacity-80"
              onClick={() => deleteProjectModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-yellow-800 animate-ping"
              />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-3">
            <div className="flex flex-col space-y-5">
              <div className="flex justify-center items-center flex-col">
                <div className="font-medium text-lg text-[#25476A]">
                  Are you sure you want to delete Project -
                </div>
                <div className="font-semibold text-lg text-[#25476A]">
                  {deleteProjectData?.name?.toUpperCase()}?
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              <div className="text-red-700 text-sm h-4 flex justify-center items-center">{errorMessage}</div>
              <button
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-1"
              onClick={() => handleDeleteUser(deleteProjectData?.id)}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
          {/* <div className="flex justify-center items-center">
            <button
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-red-600 rounded-md"
              onClick={() => handleDeleteUser(deleteProjectData?.id)}
            >
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
