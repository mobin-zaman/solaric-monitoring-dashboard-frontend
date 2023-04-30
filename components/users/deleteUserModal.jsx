import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "@/lib/Helper";
import { useMutation } from "react-query";

export default function AddUserModal({ deleteUserModalOpen, deleteUserData, userDeleted }) {

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      userDeleted(true);
      deleteUserModalOpen(false);
    },
  });

  const handleDeleteUser = (id) => {
    console.log(id);
    mutation.mutate(id);
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[10rem] sm:w-[26rem] sm:h-[10rem]">
          <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-2xl">
              Delete User
            </span>
            <button
              className="opacity-80"
              onClick={() => deleteUserModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-lg text-red-600">
              Do you want to delete {deleteUserData?.name}?
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-red-600 rounded-md"
              onClick={() => handleDeleteUser(deleteUserData?.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
