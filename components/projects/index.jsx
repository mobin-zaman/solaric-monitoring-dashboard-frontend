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
import { getProjects, searchProject } from "@/lib/Helper";
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

  const { data, isLoading, isFetching } = useQuery(
    "projects",
    () => getProjects(),
    {
      enabled: true, //enable query
    }
  );

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
    Router.push(`/project/${user.id}`);
  };

  const searchData = useQuery(() => searchProject(search), {
    enabled: searchOn,
  });

  // console.log(searchResult, "searchResult");

  const handleSearch = (e) => {
    console.log(e.target.value, "e.target.value");
    const searchPromise = searchProject(e.target.value);
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

  // const handleSolarmanPlantIdCopy = (id) => {
  //   navigator.clipboard.writeText(id);
  // };

  return (
    <>
      <div className="w-full rounded-md">
        <div className="space-y-1.5 pb-1.5">
          <div className="flex items-center justify-between bg-[#25476A] rounded-md p-3.5">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Projects
              </h1>
              <p className="text-[#373737] text-sm bg-gray-200 px-3 py-1 rounded-md">
                {data?.length} {data?.length < 2 ? "project" : "projects"}
              </p>
            </div>
            <div className="space-x-2 md:space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
                  placeholder="Search by name"
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
                <span>Add Project</span>
                <FontAwesomeIcon icon={faPlus} />
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
          <div className="space-y-1 select-none bg-white rounded-md p-1.5 text-[#25476A] font-semibold">
            <div className="grid grid-cols-12 items-center h-9">
              <div className="flex justify-center text-sm md:text-base col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3">
                Name
              </div>
              <div className="flex justify-center text-sm md:text-base col-span-4 sm:col-span-3 lg:col-span-2">
                Solarman Plant Id
              </div>
              <div className="hidden xl:block">
                <div className="flex justify-center">Capacity</div>
              </div>
              <div className="hidden sm:block sm:col-span-3 lg:col-span-2">
              <div className="flex items-center justify-center text-sm md:text-base">
                Contact
              </div>
              </div>
              <div className="hidden lg:block col-span-3">
                <div className="flex justify-center">Address</div>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {searchResult1.length > 0
            ? searchResult1?.map((user) => (
                <div
                  className="bg-white rounded-md p-2 text-gray-700"
                  key={Math.random()}
                >
                  <div className="grid grid-cols-12 items-center py-[0.001rem]">
                    <div
                      className="grid grid-cols-11 col-span-11 items-center border-r-2 hover:cursor-pointer"
                      onClick={() => handleEditUser(user)}
                    >
                      <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3">
                        <Image
                          src={
                            user?.meta?.stationImage
                              ? user?.meta?.stationImage
                              : "/Placeholder.png"
                          }
                          width={1000}
                          height={1000}
                          alt="logo"
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="select-text font-semibold">
                            {user.name}
                          </div>
                          <div className="select-none text-xs flex items-center space-x-1">
                            <span>Id:</span>
                            <span>{user.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center select-none space-x-1 text-sm col-span-4 sm:col-span-3 lg:col-span-2">
                        <span>{user.solarmanPlantId}</span>{" "}
                        {/* <button
                        onClick={() =>
                          handleSolarmanPlantIdCopy(user.solarmanPlantId)
                        }
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button> */}
                      </div>
                      <div className="select-all text-sm hidden xl:block">
                        <div className="flex justify-center">
                          {user?.meta?.installedCapacity ? (
                            <span>{user?.meta?.installedCapacity} kWp</span>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:block sm:col-span-3 lg:col-span-2">
                      <div className="flex justify-center select-all text-sm">
                        {user?.meta?.contactPhone
                          ? user.meta.contactPhone
                          : "N/A"}
                      </div>
                      </div>
                      <div className="hidden lg:block col-span-3">
                        <div className="flex">
                          <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                            {user?.meta?.locationAddress || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center col-span-1">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span className="hidden xl:block text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : data?.map((user) => (
                <div
                  className="bg-white rounded-md p-2 text-gray-700"
                  key={Math.random()}
                >
                  <div className="grid grid-cols-12 items-center py-[0.001rem]">
                    <div
                      className="grid grid-cols-11 col-span-11 items-center border-r-2 hover:cursor-pointer"
                      onClick={() => handleEditUser(user)}
                    >
                      <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3">
                        <Image
                          src={
                            user?.meta?.stationImage
                              ? user?.meta?.stationImage
                              : "/Placeholder.png"
                          }
                          width={1000}
                          height={1000}
                          alt="logo"
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="select-text font-semibold">
                            {user.name}
                          </div>
                          <div className="select-none text-xs flex items-center space-x-1">
                            <span>Id:</span>
                            <span>{user.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center select-none space-x-1 text-sm col-span-4 sm:col-span-3 lg:col-span-2">
                        <span>{user.solarmanPlantId}</span>{" "}
                        {/* <button
                        onClick={() =>
                          handleSolarmanPlantIdCopy(user.solarmanPlantId)
                        }
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button> */}
                      </div>
                      <div className="select-all text-sm hidden xl:block">
                        <div className="flex justify-center">
                          {user?.meta?.installedCapacity ? (
                            <span>{user?.meta?.installedCapacity} kWp</span>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:block sm:col-span-3 lg:col-span-2">
                      <div className="flex justify-center select-all text-sm">
                        {user?.meta?.contactPhone
                          ? user.meta.contactPhone
                          : "N/A"}
                      </div>
                      </div>
                      <div className="hidden lg:block col-span-3">
                        <div className="flex">
                          <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                            {user?.meta?.locationAddress || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center col-span-1">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span className="hidden xl:block text-sm">Delete</span>
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
