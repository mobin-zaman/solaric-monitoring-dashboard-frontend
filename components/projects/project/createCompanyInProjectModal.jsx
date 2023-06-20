import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCompanyToProject } from "@/lib/Helper";

export default function CreateCompanyInProjectModal({
  createCompanyInProjectModalOpen,
  projectData,
  companyCreatedInProject,
}) {

  const queryClient = useQueryClient();
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(addCompanyToProject, {
    onSuccess: () => {
      companyCreatedInProject(true);
      createCompanyInProjectModalOpen(false);
      queryClient.invalidateQueries("project");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    // userEdited(false);
    setErrorMessage("");
    if (!companyName || !companyCode) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    mutation.mutate({
      projectId: parseInt(projectData?.id),
      companyName: companyName,
      companyCode: companyCode,
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
            <span className="text-[#25476A] font-semibold text-lg select-none">
              Company Add In Project
            </span>
            <button
              className="opacity-80"
              onClick={() => createCompanyInProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-yellow-800" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
            <div className="text-[#25476A] text-sm font-semibold bg-gray-200 px-2 h-8 flex items-center justify-center rounded-md space-x-1 shadow-md">
              <span>Project:</span>
              <span>{projectData?.name}</span>
            </div>
            <div className="flex flex-col space-y-5">
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-lg text-[#25476A] space-x-0.5">
                  <span>Company Name</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
              <div className=" text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-lg text-[#25476A] space-x-0.5">
                  <span>Company Code</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter company code"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-red-700 text-sm h-8 flex justify-center items-center">
                {errorMessage}
              </div>
              <button
                className="flex items-center justify-center px-5 h-8 text-md font-semibold text-white bg-teal-500 hover:bg-teal-400 rounded-md"
                onClick={handleAddUser}
              >
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
