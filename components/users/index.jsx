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
import { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResult1, setSearchResult1] = useState([]);

  const { data, isLoading, isFetching } = useQuery("users", () => getUsers(), {
    enabled: true, //enable query
  });

  //when new user is created, refetch the data
  useQuery("users", () => getUsers(), {
    enabled: newUserCreated, //enable query
    onSuccess: () => setNewUserCreated(false),
  });

  //when user is deleted, refetch the data
  useQuery("users", () => getUsers(), {
    enabled: userDeleted, //enable query
    onSuccess: () => setUserDeleted(false),
  });

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

  const searchData = useQuery(() => searchUser(search), {
    enabled: searchOn,
    onSuccess: (data) => {
      setSearchResult(data);
    },
  });

  const handleSearch = (e) => {
    console.log(e.target.value, "e.target.value");
    const searchPromise = searchUser(e.target.value);
    setSearchResult(searchPromise);

    if (e.target.value.length < 0) {
      setSearchResult1(null);
    } else {
      setSearchOn(false);

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

{/* <div className="space-y-2.5">
        <div className="bg-[#25476A] rounded-md p-3.5">
          <div className="flex items-center justify-between space-x-3 select-none">
            <h1 className="text-xl font-semibold text-white tracking-wide"> */}
      <div className="w-full rounded-md">
        <div className="space-y-1.5 pb-1.5">
          <div className="flex items-center justify-between bg-[#25476A] rounded-md p-3.5">
            <div className="flex items-center space-x-3 select-none">
            <h1 className="text-xl font-semibold text-white tracking-wide">
                Users Management
              </h1>
              <p className="text-[#373737] text-sm bg-gray-200 px-3 py-1 rounded-md">
                {data?.length} {data?.length < 2 ? "user" : "users"}
              </p>
            </div>
            <div className="space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-72 h-8 rounded-md border border-gray-300 pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
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
                className="px-3 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md select-none space-x-1"
                onClick={() => setAddUserModalOpen(true)}
              >
                <span>Add User</span><FontAwesomeIcon icon={faPlus} />
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
          <div className="space-y-1 select-none bg-white text-[#25476A] font-semibold rounded-md p-1.5">
            <div className="grid grid-cols-6 items-center h-9">
              <div className="flex justify-center col-span-2 xl:col-span-1">Name</div>
              <div className="flex items-center justify-center space-x-1.5">
                <span>Status</span>
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div className="flex justify-center">Email</div>
              <div className="flex justify-center">Role</div>
              <div className="hidden xl:block"><div className="flex justify-center">Address</div></div>
              <div className=""></div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {searchResult1.length > 0
            ? searchResult1?.map((user) => (
              <div className="bg-white rounded-md p-2 text-gray-700" key={Math.random()}>
              <div className="grid grid-cols-6 items-center py-[0.001rem]">
                <div className="flex items-center font-medium space-x-2 px-5 col-span-2 xl:col-span-1">
                  <Image
                    src={placeholderImage}
                    alt="logo"
                    className="w-12 rounded-full"
                  />
                  <div><div className="select-text font-semibold">{user.name}</div><div className="select-text flex items-center space-x-1"><span>Id:</span><span>{user.id}</span></div></div>
                </div>
                <div className="flex justify-center">
                  {user.status === "ACTIVE" ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                      <span className="text-[#38EB1A] font-medium">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#9EA09E] rounded-full"></div>
                      <span className="text-[#9EA09E] font-semibold">
                        Inactive
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center select-all">
                  {user.email}
                </div>
                <div className="flex justify-center items-center">
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
                <div className="select-all text-sm hidden xl:block">
              <div className="flex justify-center">
                  {user.address}
                </div>
                </div>
                <div className="flex justify-center space-x-16 xl:space-x-10">
              <button className="flex items-center space-x-1" onClick={() => handleEditUser(user)}>
                <FontAwesomeIcon icon={faPenToSquare} /><span className="hidden xl:block">Edit</span>
              </button>
              <button className="flex items-center space-x-1" onClick={() => handleDeleteUser(user)}>
                <FontAwesomeIcon icon={faTrashCan} /><span className="hidden xl:block">Delete</span>
              </button>
            </div>

              </div>
            </div>
              ))
            : data?.map((user) => (
                <div className="bg-white rounded-md p-2 text-gray-700" key={Math.random()}>
                  <div className="grid grid-cols-6 items-center py-[0.001rem]">
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-2 xl:col-span-1">
                      <Image
                        src={placeholderImage}
                        alt="logo"
                        className="w-12 rounded-full"
                      />
                      <div><div className="select-text font-semibold">{user.name}</div><div className="select-text flex items-center space-x-1"><span>Id:</span><span>{user.id}</span></div></div>
                    </div>
                    <div className="flex justify-center">
                      {user.status === "ACTIVE" ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                          <span className="text-[#38EB1A] font-medium">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#9EA09E] rounded-full"></div>
                          <span className="text-[#9EA09E] font-semibold">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center select-all">
                      {user.email}
                    </div>
                    <div className="flex justify-center items-center">
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
                    <div className="select-all text-sm hidden xl:block">
                  <div className="flex justify-center">
                      {user.address}
                    </div>
                    </div>
                    <div className="flex justify-center space-x-16 xl:space-x-10">
                  <button className="flex items-center space-x-1" onClick={() => handleEditUser(user)}>
                    <FontAwesomeIcon icon={faPenToSquare} /><span className="hidden xl:block">Edit</span>
                  </button>
                  <button className="flex items-center space-x-1" onClick={() => handleDeleteUser(user)}>
                    <FontAwesomeIcon icon={faTrashCan} /><span className="hidden xl:block">Delete</span>
                  </button>
                </div>

                  </div>
                </div>
              ))}
        </div>
        {editUserModalOpen && (
          <EditUserModal
            editUserModalOpen={setEditUserModalOpen}
            editUserData={editUser}
            userEdited={setUserEdited}
          />
        )}
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
      </div>
    </>
  );
}
