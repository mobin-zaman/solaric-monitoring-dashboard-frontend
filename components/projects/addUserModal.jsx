import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEnvelope,faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { addUserToProject, searchUserAsUserRole } from "@/lib/Helper";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";

export default function AddUserModal({
  addUserModalOpen,
  projectId,
  projectName,
  userAdded,
}) {
  const [userId, setUserId] = useState("");
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult1, setSearchResult1] = useState(null);

  const mutation = useMutation(addUserToProject, {
    onSuccess: () => {
      userEdited(true);
      addUserModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    // userEdited(false);
    setErrorMessage("");
    if (!userId) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    mutation.mutate({
      projectId: parseInt(projectId),
      userId: parseInt(userId),
    });
  };

  const handleSearch = (e) => {
    setUserNameOrEmail(e.target.value);
    console.log(e.target.value, "e.target.value");
    const searchPromise = searchUserAsUserRole(e.target.value);

    if (e.target.value.length < 0) {
      setSearchResult1(null);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            setSearchResult1(data);
            console.log(searchResult1, "searchResult1");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] sm:w-[26rem] space-y-3">
          <div className="flex justify-between">
            <span className="text-[#373737] font-semibold text-xl">
              Add User In project {projectId}
            </span>
            <button
              className="opacity-80"
              onClick={() => addUserModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col space-y-1">
            <div className=" text-[#373737] font-medium text-sm">
              <div className="font-medium text-lg text-[#39B54A]">
                Select User
              </div>
              <div className="flex items-center border-b-2 border-[#168636]">
                <input
                  className="w-full h-10 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                  type="text"
                  placeholder="Search by user name or email"
                  value={userNameOrEmail}
                  // onChange={(e) => setUserId(e.target.value)}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {searchResult1 && (
              <div className="w-full h-24 overflow-y-auto  text-md text-white bg-transparent ring-0 focus:ring-0 focus:outline-none">
                {searchResult1.map((user) => (
                  <div
                    key={Math.random()}
                    value={user.id}
                    className={`flex items-center justify-start cursor-pointer border-b-2 border-white rounded-md ${
                      user.id === userId
                        ? "bg-[#168636] text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setUserId(user.id)}
                  >
                    <div className="flex space-x-2 px-1 py-0.5 items-center">
                    <Image
                          src={placeholderImage}
                          alt="logo"
                          className="w-10 h-10 rounded-full"
                        />                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <div className="flex items-center space-x-5">
                      <span className="text-sm flex items-center space-x-1">
                      <FontAwesomeIcon icon={faIdBadge} />
                          <span>{user.id}</span>
                        </span>
                        <span className="text-sm flex items-center space-x-1">
                          <FontAwesomeIcon icon={faEnvelope} />
                          <span>{user.email}</span>
                        </span>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-red-700 text-sm">
              {errorMessage ===
              "The email address is already in use by another account."
                ? "The email address is already used."
                : errorMessage}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="px-2.5 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
