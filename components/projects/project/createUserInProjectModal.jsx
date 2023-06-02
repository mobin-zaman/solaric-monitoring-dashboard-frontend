import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUserToProject, searchUserAsUserRole } from "@/lib/Helper";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";

export default function CreateUserInProjectModal({
  createUserInProjectModalOpen,
  projectData,
  userCreatedInProject,
}) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult1, setSearchResult1] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const mutation = useMutation(addUserToProject, {
    onSuccess: () => {
      userCreatedInProject(true);
      createUserInProjectModalOpen(false);
      queryClient.invalidateQueries("project");
    },
    onError: (error) => {
      setErrorMessage(
        error.response.data.message ===
          "\nInvalid `this.prisma.userProject.create()` invocation in\n/root/monitoring_portal/solaric-monitoring-dashboard-backend/dist/project/project.service.js:189:50\n\n  186     throw new common_1.BadRequestException('User who needs to be assigned, must be of user role');\n  187 }\n  188 try {\n→ 189     return await this.prisma.userProject.create(\nUnique constraint failed on the fields: (`userId`,`projectId`)"
          ? "User already added in this Project"
          : "Something went wrong"
      );
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!userId) {
      setErrorMessage("Please select a user");
      return;
    }

    mutation.mutate({
      projectId: parseInt(projectData?.id),
      userId: parseInt(userId),
    });
  };

  const handleSearch = (e) => {
    setUserNameOrEmail(e.target.value);
    setSearchOn(true);
    const searchPromise = searchUserAsUserRole(e.target.value);

    if (e.target.value.length < 1) {
      setSearchResult1(null);
      setSearchOn(false);
      setSearchResultEmpty(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmpty(true);
            } else {
              setSearchResultEmpty(false);
              setSearchResult1(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
            <span className="text-[#25476A] font-semibold text-lg select-none">
              User Add In Project
            </span>
            <button
              className="opacity-80"
              onClick={() => createUserInProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-yellow-800" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
            <div className="text-[#25476A] text-sm font-semibold bg-gray-200 px-2 h-8 flex items-center justify-center rounded-md space-x-1 shadow-md">
              <span>Project:</span>
              <span>{projectData?.name}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-lg text-[#25476A] space-x-0.5 select-none">
                  <span>Select User</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Search by user name or email"
                    value={userNameOrEmail}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              {!searchResultEmpty && searchResult1?.length > 0 && searchOn && (
                <div className="w-full h-24 overflow-y-auto space-y-1.5 text-md text-white bg-transparent ring-0 focus:ring-0 focus:outline-none select-none">
                  {searchResult1?.map((user) => (
                    <div
                      key={Math.random()}
                      value={user.id}
                      className={`flex items-center justify-start cursor-pointer rounded-md ${
                        user.id === userId
                          ? "bg-[#25476A] text-white"
                          : "bg-gray-200 text-[#25476A]"
                      }`}
                      onClick={() => setUserId(user.id)}
                    >
                      <div className="flex space-x-2 px-1 py-0.5 items-center">
                        <Image
                          src={placeholderImage}
                          alt="logo"
                          className="w-10 h-10 rounded-full"
                        />{" "}
                        <div className="flex flex-col">
                          <span>{user.name}</span>
                          <div className="flex items-center space-x-5">
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
              {searchResultEmpty && (
                <div className="flex justify-center items-center select-none">
                  <div className="text-sm font-semibold text-[#25476A]">
                    No user found ! &#x1F61E;
                  </div>
                </div>
              )}
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
