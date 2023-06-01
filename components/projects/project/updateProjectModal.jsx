import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { updateUser } from "@/lib/Helper";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";

export default function UpdateProjectModal({
  updateProjectModalOpen,
  editProjectData,
  projectUpdated,
}) {
  const [name, setName] = useState(editProjectData?.name || "");
  const [email, setEmail] = useState(editProjectData?.email || "");
  const [role, setRole] = useState(editProjectData?.role || "");
  const [statusValue, setStatusValue] = useState(
    editProjectData?.status === "ACTIVE" ? true : false
  );
  console.log(statusValue);
  const [address, setAddress] = useState(editProjectData?.address || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [userTab, setUserTab] = useState(true);
  const [companyTab, setCompanyTab] = useState(false);
  const [editTab, setEditTab] = useState(false);
  const [users, setUsers] = useState(editProjectData?.users || []);
  console.log(users);

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      projectUpdated(true);
      updateProjectModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleEditUser = (e) => {
    e.preventDefault();
    projectUpdated(false);
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
      id: parseInt(editProjectData.id),
      name,
      email,
      role,
      address,
      status: statusValue ? "ACTIVE" : "DISABLED",
    });
  };

  const handleUserTab = (value) => {
    setUserTab(value);
    setCompanyTab(false);
    setEditTab(false);
  };

  const handleCompanyTab = (value) => {
    setUserTab(false);
    setCompanyTab(value);
    setEditTab(false);
  };

  const handleEditTab = (value) => {
    setUserTab(false);
    setCompanyTab(false);
    setEditTab(value);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 5000);
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[30rem] sm:w-[26rem] sm:h-[30rem]">
          <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-xl">
              Project Update
            </span>
            <button
              className="opacity-80"
              onClick={() => updateProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {/* <div className="dropdown">
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
          </div> */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`${
                  userTab
                    ? "bg-[#6121c9] text-white font-medium py-1 rounded-t-md"
                    : ""
                } w-full flex justify-center`}
                onClick={() => handleUserTab(true)}
              >
                Users
              </button>
              <button
                className={`${
                  companyTab
                    ? "bg-[#6121c9] text-white font-medium py-1 rounded-t-md"
                    : ""
                } w-full flex justify-center`}
                onClick={() => handleCompanyTab(true)}
              >
                Companies
              </button>
              <button
                className={`${
                  editTab
                    ? "bg-[#6121c9] text-white font-medium py-1 rounded-t-md"
                    : ""
                } w-full flex justify-center`}
                onClick={() => handleEditTab(true)}
              >
                Edit
              </button>
            </div>
            {userTab && (
              <div className="flex border-2 rounded-b-md rounded-tr-md border-[#6121c9] h-64 bg-gray-200">
                <div className="flex flex-col w-full h-full overflow-y-auto">
                  {users.map((user) => (
                    <div
                      className="flex justify-between bg-white"
                      key={Math.random()}
                    >
                      <div className="flex space-x-1">
                        <Image
                          src={placeholderImage}
                          alt="logo"
                          className="w-14 rounded-full border border-[#373737]"
                        />
                        <div className="flex flex-col">
                          <span className="text-[#373737] font-semibold text-md">
                            {user.user.name}
                          </span>
                          <span className="text-[#373737] font-semibold text-xs">
                            Id: {user.userId}
                          </span>
                          <span className="text-[#373737] font-semibold text-xs">
                            Status: {user.user.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p
                          onMouseDown={handleClick}
                          onMouseUp={() => setIsClicked(false)}
                          style={{
                            backgroundColor: isClicked ? "gray" : "white",
                          }}
                        >
                          delete
                        </p>
                        {isClicked && <p>Clicked for 5 seconds!</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {companyTab && (
              <div className="flex border-2 rounded-md border-[#6121c9] w-full h-64">
                Hi company
              </div>
            )}
            {editTab && (
              <div className="flex border-2 rounded-b-md rounded-tl-md border-[#6121c9] w-full h-64">
                Hi edit
              </div>
            )}
          </div>
          {/* <div className="flex flex-col">
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
          </div> */}
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
