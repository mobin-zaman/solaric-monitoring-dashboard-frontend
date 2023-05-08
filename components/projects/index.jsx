import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowDown,
  faPlus,
  faMagnifyingGlass,
  faEye,
  faCopy,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { getProjects, searchUser } from "@/lib/Helper";
import CreateProjectModal from "./createProjectModal";
import { useState } from "react";
import Image from "next/image";
import placeholderImage from "@/public/placeholderImage.jpg";
import DeleteProjectModal from "./deleteProjectModal";
import UpdateProjectModal from "./updateProjectModal";
import Id from "@/public/icons/Id.png";
import Location from "@/public/icons/Location.png";
import TimestampConverter from "@/lib/TimestampConverter";
import Router from "next/router";


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
  console.log(search, "search");
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResult1, setSearchResult1] = useState([]);

  const { data, isLoading, isFetching } = useQuery("projects", () => getProjects(), {
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
    // setEditUserModalOpen(true);
    // setEditUser(user);
    Router.push(`/projects/${user.id}`);
  };

  const searchData = useQuery(() => searchUser(search), {
    enabled: searchOn,
    onSuccess: (data) => {
      setSearchResult(data);
    },
  });

  console.log(searchResult, "searchResult");

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

  const handleSolarmanPlantIdCopy = (id) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <>
      <div className="w-full rounded-md">
        <div className="space-y-1 pb-1">
          <div className="flex items-center justify-between bg-white rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-[#373737] font-semibold text-xl">
                Projects Management
              </h1>
              <p className="text-[#373737] text-sm bg-gray-200 p-1 rounded-md">
                {data?.length} {data?.length < 2 ? "project" : "projects"}
              </p>
            </div>
            <div className="space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-72 h-9 rounded-md border border-gray-300 pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
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
                className="px-3 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md select-none"
                onClick={() => setAddUserModalOpen(true)}
              >
                Add User <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {addUserModalOpen && (
              <CreateProjectModal
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
          <div className="space-y-1 select-none bg-white rounded-md p-1.5">
            <div className="grid grid-cols-9 items-center h-9">
              <div className="flex justify-center font-medium col-span-2">Name</div>
              <div className="flex justify-center font-medium">Solarman Plant Id</div>
              <div className="flex items-center justify-center font-medium space-x-1.5">
                <span>Status</span>
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div className="flex justify-center font-medium">Capacity (Wp)</div>
              <div className="flex justify-center font-medium">Contact</div>
              <div className="flex justify-center font-medium">Last Update</div>
              <div className=""></div><div className=""></div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {searchResult1.length > 0
            ? searchResult1?.map((user) => (
              <div className="bg-white rounded-md p-2" key={Math.random()}>
              <div className="grid grid-cols-9 items-center py-[0.001rem]">
                <div className="flex items-center font-medium space-x-2 px-5 col-span-2">
                  <Image
                    src={user?.meta?.stationImage}
                    width={1000}
                    height={1000}
                    alt="logo"
                    className="w-14 h-14 rounded-full"
                  />
                  <div><div className="select-text">{user.name}</div><div className="select-none text-xs flex items-center"><FontAwesomeIcon icon={faIdCard} />&nbsp;{user.id}</div><div className="text-xs flex items-center sm: w-40 xl:w-44 truncate select-none"><Image src={Location} alt="Id" className="w-3 h-3.5" />&nbsp;{user.meta.locationAddress}</div></div>
                </div>
                <div className="flex justify-center select-none space-x-1 text-sm">
                <span>{user.solarmanPlantId}</span> <button onClick={() => handleSolarmanPlantIdCopy(user.solarmanPlantId)}><FontAwesomeIcon icon={faCopy} /></button>
                </div>
                <div className="flex justify-center">
                  {user.meta.networkStatus === "PARTIAL_OFFLINE" ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#EAA724] rounded-full"></div>
                      <span className="text-[#EAA724] font-medium text-sm">
                        Partial Offline
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
                <div className="flex justify-center select-all text-sm">
                  {user?.meta?.installedCapacity}
                </div>
                <div className="flex justify-center select-all text-sm">
                  {user.meta.contactPhone ? user.meta.contactPhone : "N/A"}
                </div>
                <div className="flex justify-center select-all text-sm">
                  <TimestampConverter timestamp={user?.meta?.lastUpdateTime} />
                </div>
                <div className="flex justify-center space-x-10 col-span-2">
                <button onClick={() => handleDeleteUser(user)}>
                  <FontAwesomeIcon icon={faEye} /> View
                  </button>
                  <button onClick={() => handleEditUser(user)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user)}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                  </button>
                </div>
              </div>
            </div>
              ))
            : data?.map((user) => (
                <div className="bg-white rounded-md p-2" key={Math.random()}>
                  <div className="grid grid-cols-9 items-center py-[0.001rem]">
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-2">
                      <Image
                        src={user?.meta?.stationImage ? user?.meta?.stationImage : "/Placeholder.png"}
                        width={1000}
                        height={1000}
                        alt="logo"
                        className="w-14 h-14 rounded-full"
                      />
                      <div><div className="select-text">{user.name}</div><div className="select-none text-xs flex items-center"><FontAwesomeIcon icon={faIdCard} />&nbsp;{user.id}</div><div className="text-xs flex items-center sm: w-40 xl:w-44 truncate select-none"><Image src={Location} alt="Id" className="w-3 h-3.5" />&nbsp;{user?.meta?.locationAddress}</div></div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm">
                    <span>{user.solarmanPlantId}</span> <button onClick={() => handleSolarmanPlantIdCopy(user.solarmanPlantId)}><FontAwesomeIcon icon={faCopy} /></button>
                    </div>
                    <div className="flex justify-center">
                      {user?.meta?.networkStatus === "PARTIAL_OFFLINE" ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#EAA724] rounded-full"></div>
                          <span className="text-[#EAA724] font-medium text-sm">
                            Partial Offline
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#148bf4] rounded-full"></div>
                          <span className="text-[#148bf4] font-semibold text-sm">
                          Normal
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center select-all text-sm">
                      {user?.meta?.installedCapacity}
                    </div>
                    <div className="flex justify-center select-all text-sm">
                      {user?.meta?.contactPhone ? user.meta.contactPhone : "N/A"}
                    </div>
                    <div className="flex justify-center select-all text-sm">
                      <TimestampConverter timestamp={user?.meta?.lastUpdateTime} />
                    </div>
                    <div className="flex justify-center space-x-10 col-span-2">
                      <button onClick={() => handleEditUser(user)}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                      </button>
                      <button onClick={() => handleDeleteUser(user)}>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {editUserModalOpen && (
          <UpdateProjectModal
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
          <DeleteProjectModal
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
