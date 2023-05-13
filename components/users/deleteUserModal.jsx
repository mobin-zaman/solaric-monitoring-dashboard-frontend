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
    mutation.mutate(parseInt(id));
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50 select-none">
        <div className="grid grid-cols-1 bg-[#25476A] rounded-md items-center relative mx-auto p-5 space-y-4">
          <div className="flex justify-end">
            {/* <span className="text-[#373737] font-semibold text-2xl">
              Delete User
            </span> */}
            <button
              className="opacity-80 text-white"
              onClick={() => deleteUserModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="font-medium text-lg text-white">
            Are you sure you want to delete user {deleteUserData?.name?.toUpperCase()}?
            </div>
          </div>
          <div className="flex justify-center items-center">
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
