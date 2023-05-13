import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowDown,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { getUsers, searchUser } from "@/lib/Helper";
import AddUserModal from "./addUserModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";
import DeleteUserModal from "./deleteUserModal";
import EditUserModal from "./editUserModal";
import Id from "@/public/icons/Id.png";

export default function Users() {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [userEdited, setUserEdited] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [searchResult1, setSearchResult1] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    "users",
    () => getUsers(),
    {
      enabled: true, //enable query
    }
  );

  //when new user is created, refetch the data
  useEffect(() => {
    if (newUserCreated) {
      refetch();
      setNewUserCreated(false);
    } else if (userDeleted) {
      refetch();
      setUserDeleted(false);
    }
  }, [newUserCreated, refetch, userDeleted]);

  //when user is edited, refetch the data
  useQuery("users", () => getUsers(), {
    enabled: userEdited, //enable query
    onSuccess: () => setUserEdited(false),
  });

  const handleDeleteUser = (user) => {
    setDeleteUserModalOpen(true);
    setDeleteUser(user);
  };

  const handleEditUser = (user) => {
    setEditUserModalOpen(true);
    setEditUser(user);
  };

  const handleSearch = (e) => {
    setSearchOn(true);
    console.log(e.target.value, "e.target.value");
    const searchPromise = searchUser(e.target.value);

    if (e.target.value.length < 1) {
      setSearchResult1(null);
      setSearchOn(false);
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
      <div className="space-y-1.5">
        <div className="space-y-1.5">
          <div
            className={`flex items-center justify-between bg-[#25476A] rounded-md p-3.5 ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Users
              </h1>
              <p className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md">
                {data?.length} {data?.length < 2 ? "user" : "users"}
              </p>
            </div>
            <div className="space-x-2 md:space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                  placeholder="Search by name or email"
                  onChange={handleSearch}
                />
                <div className="absolute top-1.5 right-2.5">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400"
                  />
                </div>
              </div>
              <button
                className="flex h-8 items-center justify-center p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-md select-none space-x-1"
                onClick={() => setAddUserModalOpen(true)}
              >
                <span className="">Add User</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {addUserModalOpen && (
              <AddUserModal
                addUserModalOpen={setAddUserModalOpen}
                newUserCreated={setNewUserCreated}
              />
            )}
            {newUserCreated && (
              <div className="toast toast-end">
                <div className="alert alert-success">
                  <div>
                    <span>User Created successfully.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!isLoading && !isError && (
            <div className="space-y-1 select-none bg-white text-[#25476A] font-semibold rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9">
                <div className="grid grid-cols-10 col-span-11">
                  <div className="flex justify-center col-span-6 lg:col-span-4">
                    Name
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 col-span-2 lg:col-span-1">
                    <span>Status</span>
                    {/* <FontAwesomeIcon icon={faArrowDown} /> */}
                  </div>
                  <div className="hidden lg:block lg:col-span-4">
                    <div className="flex justify-center">Email</div>
                  </div>
                  <div className="flex justify-center col-span-2 lg:col-span-1">
                    Role
                  </div>
                  {/* <div className="hidden xl:block"><div className="flex justify-center">Address</div></div> */}
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>
          )}
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              searchResult1?.length > 0 &&
              searchOn &&
              searchResult1?.map((user) => (
                <div
                  className="bg-white rounded-md p-1.5 text-[#25476A]"
                  key={Math.random()}
                >
                  <div className="grid grid-cols-12 items-center py-[0.001rem]">
                    <div
                      className="grid grid-cols-10 col-span-11 border-r items-center"
                      onClick={() => handleEditUser(user)}
                    >
                      <div className="flex items-center font-medium space-x-2 px-5 col-span-6 lg:col-span-4">
                        <Image
                          src={placeholderImage}
                          alt="logo"
                          className="w-12 rounded-full"
                        />
                        <div>
                          <div className="select-text font-semibold">
                            {user.name}
                          </div>
                          <div className="select-text text-sm flex items-center space-x-1">
                            <span>Id:</span>
                            <span>{user.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center col-span-2 lg:col-span-1">
                        {user.status === "ACTIVE" ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                            <span className="text-[#38EB1A] font-medium text-sm">
                              Active
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#9EA09E] rounded-full"></div>
                            <span className="text-[#9EA09E] font-semibold text-sm">
                              Inactive
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="hidden lg:block lg:col-span-4">
                        <div className="flex items-center justify-center select-all text-sm">
                          {user?.email || "N/A"}
                        </div>
                      </div>
                      <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                        {user.role === "ADMIN" ? (
                          <div className="px-2 py-1 bg-[#66C38B] text-white font-medium rounded-md">
                            Admin
                          </div>
                        ) : null}
                        {user.role === "ENGINEER" ? (
                          <div className="px-2 py-1 bg-[#C36666] font-medium text-white rounded-md">
                            Engineer
                          </div>
                        ) : null}
                        {user.role === "USER" ? (
                          <div className="px-2 py-1 bg-[#e18b13] font-medium text-white rounded-md">
                            User
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* <div className="select-all text-sm hidden xl:block">
                  <div className="flex justify-center">
                      {user.address}
                    </div>
                    </div> */}
                    <div className="flex justify-center col-span-1">
                      <button
                        className="flex items-center space-x-1 text-sm"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span className="hidden xl:block">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {searchResultEmpty ? (
              <div className="flex justify-center items-center h-44">
                <div className="text-xl font-semibold text-[#25476A]">
                  No user found ! &#x1F61E;
                </div>
              </div>
            ) : (
              ""
            )}

            {!searchResultEmpty &&
              !searchOn &&
              data?.map((user) => (
                <div
                  key={Math.random()}
                  className="grid grid-cols-12 items-center bg-white rounded-md text-[#25476A]"
                >
                  <div
                    className="grid grid-cols-10 col-span-11 border-r items-center p-2 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                    onClick={() => handleEditUser(user)}
                  >
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-6 lg:col-span-4">
                      <Image
                        src={placeholderImage}
                        alt="logo"
                        className="w-12 rounded-full"
                      />
                      <div>
                        <div className="select-text font-semibold">
                          {user.name}
                        </div>
                        <div className="select-text text-sm flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{user.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center col-span-2 lg:col-span-1">
                      {user.status === "ACTIVE" ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                          <span className="text-[#38EB1A] font-medium text-sm">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#9EA09E] rounded-full"></div>
                          <span className="text-[#9EA09E] font-semibold text-sm">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block lg:col-span-4">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.email || "N/A"}
                      </div>
                    </div>
                    <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                      {user.role === "ADMIN" ? (
                        <div className="px-2 py-1 bg-[#66C38B] text-white text-sm font-medium rounded-md">
                          Admin
                        </div>
                      ) : null}
                      {user.role === "ENGINEER" ? (
                        <div className="px-2 py-1 bg-[#C36666] font-medium text-sm text-white rounded-md">
                          Engineer
                        </div>
                      ) : null}
                      {user.role === "USER" ? (
                        <div className="px-2 py-1 bg-[#e18b13] font-medium text-sm text-white rounded-md">
                          User
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className="select-all text-sm hidden xl:block">
                  <div className="flex justify-center">
                      {user.address}
                    </div>
                    </div> */}
                  <div className="flex justify-center col-span-1">
                    <button
                      className="flex items-center space-x-1 text-sm"
                      onClick={() => handleDeleteUser(user)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span className="hidden xl:block">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        {editUserModalOpen && (
          <EditUserModal
            editUserModalOpen={setEditUserModalOpen}
            editUserData={editUser}
            userEdited={setUserEdited}
          />
        )}
      </div>
      {userEdited && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <div>
              <span>User edited successfully.</span>
            </div>
          </div>
        </div>
      )}
      {deleteUserModalOpen && (
        <DeleteUserModal
          deleteUserModalOpen={setDeleteUserModalOpen}
          deleteUserData={deleteUser}
          userDeleted={setUserDeleted}
        />
      )}
      {userDeleted && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <div>
              <span>User deleted successfully.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
