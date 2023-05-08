import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateUser } from "@/lib/Helper";

export default function AddUserModal({
  editUserModalOpen,
  editUserData,
  userEdited,
}) {
  const [name, setName] = useState(editUserData?.name || "");
  const [email, setEmail] = useState(editUserData?.email || "");
  const [role, setRole] = useState(editUserData?.role || "");
  const [statusValue, setStatusValue] = useState(
    editUserData?.status === "ACTIVE" ? true : false
  );
  console.log(statusValue);
  const [address, setAddress] = useState(editUserData?.address || "");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      userEdited(true);
      editUserModalOpen(false);
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
    if (!name || !email || !role || !address) {
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
      address,
      status: statusValue ? "ACTIVE" : "DISABLED",
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[30rem] sm:w-[26rem] sm:h-[30rem]">
          <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-2xl">
              Project Update
            </span>
            <button
              className="opacity-80"
              onClick={() => editUserModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Click
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <div className=" text-[#373737] font-medium text-sm space-x-1">
              <div className="font-medium text-lg">Name</div>
              <div className="flex items-center border-b-2 border-[#168636]">
                <input
                  className="w-full h-10 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Enter user name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
              <div className="font-medium text-lg">Email</div>
              <div className="flex items-center border-b-2 border-[#168636]">
                <input
                  className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Password</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /></div>
          </div> */}
            {/* <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Confirm Password</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /></div>
          </div> */}
            <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
              <div className="font-medium text-lg">Address</div>
              <div className="flex items-center border-b-2 border-[#168636]">
                <input
                  className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 text-[#373737] font-medium text-sm py-2">
              <div className="font-medium text-lg">Role: </div>
              <select
                className="w-1/2 h-10 border border-[#168636] rounded-md p-2 ring-0 focus:ring-0 focus:outline-none"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="ADMIN" selected={role === "ADMIN"}>
                  Admin
                </option>
                <option value="ENGINEER" selected={role === "ENGINEER"}>
                  Engineer
                </option>
                <option value="USER" selected={role === "USER"}>
                  User
                </option>
              </select>
            </div>
            <div className="flex items-center space-x-3 text-[#373737] font-medium text-sm py-2">
              <div className="font-medium text-lg">Status: </div>
              <input
                type="checkbox"
                className="toggle toggle-success"
                onChange={() => setStatusValue(!statusValue)}
                checked={statusValue}
              />
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
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md"
              onClick={handleEditUser}
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
