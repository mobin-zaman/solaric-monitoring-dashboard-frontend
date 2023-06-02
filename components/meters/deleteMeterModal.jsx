//Completed: Yes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteMeter } from "@/lib/Helper";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

export default function DeleteMeterModal({
  deleteMeterModalOpen,
  meterData,
  meterDeleted,
}) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(deleteMeter, {
    onSuccess: () => {
      meterDeleted(true);
      deleteMeterModalOpen(false);
      queryClient.invalidateQueries("meters");
    },
    onError: (error) => {
      setErrorMessage("Something went wrong");
    },
  });

  const handleDeleteMeter = (id) => {
    mutation.mutate(parseInt(id));
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
            <span className="text-[#25476A] font-semibold text-lg">
              Meter Delete
            </span>
            <button
              className="opacity-80"
              onClick={() => deleteMeterModalOpen(false)}
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
                  Are you sure to delete the Meter -
                </div>
                <div className="font-semibold text-lg text-[#25476A]">
                  {meterData?.id} ?
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              <div className="text-red-700 text-sm h-4 flex justify-center items-center">
                {errorMessage}
              </div>
              <button
                className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-1"
                onClick={() => handleDeleteMeter(meterData?.id)}
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
