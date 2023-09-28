import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "@/lib/Helper";

export default function AddUserModal({
  editUserModalOpen,
  editUserData,
  userEdited,
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(editUserData?.name || "");
  const [email, setEmail] = useState(editUserData?.email || "");
  const [role, setRole] = useState(editUserData?.role || "");
  const [statusValue, setStatusValue] = useState(
    editUserData?.status === "ACTIVE" ? true : false
  );
  console.log(statusValue);
  const [companyName, setCompanyName] = useState(editUserData?.companyName || "");
  const [address, setAddress] = useState(editUserData?.address || "");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      userEdited(true);
      editUserModalOpen(false);
      queryClient.invalidateQueries("currentUser");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleEditUser = (e) => {
    e.preventDefault();
    userEdited(false);
    setErrorMessage("");
    setErrorMessage("");
    if (!name || !email || !role || !companyName || !address) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    // if (password !== confirmPassword) {
    //   setErrorMessage("Password do not match");
    //   return;
    // }
    mutation.mutate({
      id: parseInt(editUserData.id),
      name,
      email,
      role,
      companyName,
      address,
      status: statusValue ? "ACTIVE" : "DISABLED",
    });
  };

  return (
    <>

<div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-700 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-700 rounded-t-md px-6 py-3">
            <span className="text-gray-200 font-semibold text-lg">
            User Update
            </span>
            <button
              className="opacity-80"
              onClick={() => editUserModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-gray-200" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
          <div className="flex flex-col space-y-3">
          <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Name</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                  placeholder="Enter user name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Email</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Role</span>
                  <span className="text-red-500">*</span>
                  </div>
              <select
                className="w-full h-10 border-b-2 border-gray-800 bg-transparent p-2 ring-0 focus:ring-0 focus:outline-none"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="ENGINEER">Engineer</option>
                <option value="USER">User</option>
              </select>
            </div>
            <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Company Name</span>
                  <span className="text-red-500">*</span>
                  </div>
                  <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Address</span>
                  <span className="text-red-500">*</span>
                  </div>
              <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
            <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none"
                onClick={handleEditUser}
                > <FontAwesomeIcon icon={faPenToSquare} />
                <span className="">Update Meter</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
