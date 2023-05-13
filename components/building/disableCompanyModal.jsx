import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteInverterFromBuilding } from "@/lib/Helper";
import { useMutation } from "react-query";

export default function DeleteProjectModal({ disableCompanyModalOpen , inverterId, inverterDeleted }) {

  const mutation = useMutation(deleteInverterFromBuilding, {
    onSuccess: () => {
      inverterDeleted(true);
      disableCompanyModalOpen(false);
    },
  });

  const handleDeleteUser = () => {
    mutation.mutate(
      {
        inverterId: parseInt(inverterId),
      }
    );
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[10rem] sm:w-[26rem] sm:h-[10rem]">
          <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-xl">
              Delete Inverter
            </span>
            <button
              className="opacity-80"
              onClick={() => disableCompanyModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-md text-red-600">
              Do you want to delete {inverterId}?
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-red-600 rounded-md"
              onClick={() => handleDeleteUser()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
