import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteCompanyFromProject } from "@/lib/Helper";
import { useMutation, useQueryClient } from "react-query";

export default function DeleteCompanyFromProjectModal({ deleteCompanyFromProjectModalOpen , projectData, companyData, companyDeletedFromProject }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteCompanyFromProject, {
    onSuccess: () => {
      companyDeletedFromProject(true);
      deleteCompanyFromProjectModalOpen(false);
      queryClient.invalidateQueries("project");
    },
  });

  const handleDeleteUser = (companyId) => {
    mutation.mutate(
      {
        projectId: parseInt(projectData?.id),
        companyId: parseInt(companyId),
      }
    );
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
      <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[24rem] sm:w-[28rem] space-y-5 shadow-md border border-gray-300">
      <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
      <span className="text-[#25476A] font-semibold text-lg">
              Company Delete From Project
            </span>
            <button
              className="opacity-80"
              onClick={() => deleteCompanyFromProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark}                 className="text-yellow-800"
 />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-3">
          <div className="text-[#25476A] text-sm font-semibold bg-gray-200 px-2 h-8 flex items-center justify-center rounded-md space-x-1 shadow-md">
              <span>Project:</span>
              <span>{projectData?.name}</span>
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex justify-center items-center flex-col">
                <div className="font-medium text-lg text-[#25476A]">
                  Are you sure to delete Company -
                </div>
                <div className="font-semibold text-sm text-[#25476A]">
                  {companyData?.name?.toUpperCase()} ?
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              <div className="text-red-700 text-sm h-4 flex justify-center items-center">
                {/* {errorMessage} */}
              </div>
              <button
                className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-1"
                onClick={() => handleDeleteUser(companyData?.id)}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
