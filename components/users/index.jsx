import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowDown,
  faUserPlus,
  faMagnifyingGlass,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faHouse,
  faUserGroup,
  faEnvelope,
  faGear,
  faCalculator,
  faCubesStacked,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { getUsers, searchUser } from "@/lib/Helper";
import AddUserModal from "./addUserModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";
import DeleteUserModal from "./deleteUserModal";
import EditUserModal from "./updateUserModal";
import Id from "@/public/icons/Id.png";
import Link from "next/link";

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
    const searchPromise = searchUser(e.target.value);

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

  const [sortKey, setSortKey] = useState(null);
  const [ascending, setAscending] = useState(true);

  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle ascending/descending order if the same column is clicked
      setAscending(!ascending);
    } else {
      // Set the new sorting column and default to ascending order
      setSortKey(key);
      setAscending(true);
    }
  };

  // Sort the data based on the current sorting criteria
  const sortedData = data?.slice().sort((a, b) => {
    if (sortKey === 'name') {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'id') {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  const sortedSearchData = searchResult1?.slice().sort((a, b) => {
    if (sortKey === 'name') {
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'id') {
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="space-y-1.5 relative select-none">
        <div className="sticky -top-0 z-50 bg-white rounded-b-md">
          <div className="text-sm breadcrumbs text-[#25476A] pl-1">
            <ul>
              <li>
                <Link href="/dashboard">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={`w-4 h-4`}
                    title="Dashboard"
                  />
                  <span className="ml-2">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/users">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={`w-4 h-4`}
                    title="Users"
                  />
                  <span className="ml-2">Users</span>
                </Link>
              </li>
            </ul>
          </div>
        <div className="space-y-1.5">
        <div className="flex items-center justify-between bg-gray-700 rounded-md p-3.5">
              <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center"> 
                            <FontAwesomeIcon
                    icon={faUsers}
                    className={`w-5 h-5`}
                    title="Meters"
                  />
               <span>Users</span>
              </h1>
              <p className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl">
                {data?.length} {data?.length < 2 ? "User" : "Users"}
              </p>
            </div>
            <div className="space-x-2 md:space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 md:w-56 h-7 lg:w-72 placeholder:text-xs rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                  placeholder="Search by name or email"
                  onChange={handleSearch}
                />
                <div className="absolute top-0.5 right-2.5">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400 text-xs"
                  />
                </div>
              </div>
              <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1"
                onClick={() => setAddUserModalOpen(true)}
              >
                <FontAwesomeIcon icon={faUserPlus} />                <span className="">Add User</span>
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
          {!isLoading && !isError && !searchResultEmpty && (
            <div className="space-y-1 select-none bg-gray-600 text-gray-200 font-medium rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9">
                <div className="grid grid-cols-11 col-span-11">
                  <div className="flex justify-center items-center col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-3 space-x-1" onClick={() => handleSort('name')}>
                    <span>Name</span>
                    {sortKey === "name" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-1">
                    <span>Status</span>
                    {/* <FontAwesomeIcon icon={faArrowDown} /> */}
                  </div>
                  <div className="hidden md:block md:col-span-3 xl:col-span-2">
                    <div className="flex justify-center">User</div>
                  </div>
                  <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                    <div className="flex justify-center">Project</div>
                  </div>
                  <div className="hidden xl:block lg:col-span-2">
                    <div className="flex justify-center">Company</div>
                  </div>
                  <div className="flex justify-center col-span-2 sm:col-span-2 lg:col-span-1">
                    Role
                  </div>
                  {/* <div className="hidden xl:block"><div className="flex justify-center">Address</div></div> */}
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>
          )}
        </div>
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              sortedSearchData?.length > 0 &&
              searchOn &&
              sortedSearchData?.map((user, index) => (
                <div
                  key={Math.random()}
                  className={`grid grid-cols-12 items-center rounded-md text-gray-700 border ${index % 2 === 0 ? "bg-gray-100 border-gray-200" : "bg-gray-200 border-gray-300"} `}
                >
                  <div
                    className={`grid grid-cols-11 col-span-11 border-r border-gray-300 items-center p-2 cursor-pointer hover:rounded-l-md ${index % 2 === 0 ? "hover:bg-gray-200" : "hover:bg-gray-300"} `}
                    onClick={() => handleEditUser(user)}
                  >
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-3">
                      <Image
                        src={placeholderImage}
                        alt="logo"
                        className="w-14 h-14 rounded-full"
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
                    <div className="flex justify-center col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-1">
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
                    <div className="hidden md:block md:col-span-3 xl:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.userName || "N/A"}
                      </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.projectName || "N/A"}
                      </div>
                    </div>
                    <div className="hidden xl:block lg:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.companyName || "N/A"}
                      </div>
                    </div>
                    {/* <div className="hidden lg:block lg:col-span-3">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.email || "N/A"}
                      </div>
                    </div> */}
                    <div className="flex justify-center items-center col-span-2 sm:col-span-2 lg:col-span-1">
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
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
                      onClick={() => handleDeleteUser(user)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span className="hidden xl:block">Delete</span>
                    </button>
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
              sortedData?.map((user, index) => (
                <div
                  key={Math.random()}
                  className={`grid grid-cols-12 items-center rounded-md text-gray-700 border ${index % 2 === 0 ? "bg-gray-100 border-gray-200" : "bg-gray-200 border-gray-300"} `}
                >
                  <div
                    className={`grid grid-cols-11 col-span-11 border-r border-gray-300 items-center p-2 cursor-pointer hover:rounded-l-md ${index % 2 === 0 ? "hover:bg-gray-200" : "hover:bg-gray-300"} `}
                    onClick={() => handleEditUser(user)}
                  >
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-3">
                      <Image
                        src={placeholderImage}
                        alt="logo"
                        className="w-14 h-14 rounded-full"
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
                    <div className="flex justify-center col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-1">
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
                    <div className="hidden md:block md:col-span-3 xl:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.userName || "N/A"}
                      </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.projectName || "N/A"}
                      </div>
                    </div>
                    <div className="hidden xl:block lg:col-span-2 text-center">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.companyName || "N/A"}
                      </div>
                    </div>
                    {/* <div className="hidden lg:block lg:col-span-3">
                      <div className="flex items-center justify-center select-all text-sm">
                        {user?.email || "N/A"}
                      </div>
                    </div> */}
                    <div className="flex justify-center items-center col-span-2 sm:col-span-2 lg:col-span-1">
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
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
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
