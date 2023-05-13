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
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
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


  const handleSearch = (e) => {
    setSearchOn(true);
    const searchPromise = searchProject(e.target.value);

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

  // const handleSolarmanPlantIdCopy = (id) => {
  //   navigator.clipboard.writeText(id);
  // };

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
                Projects
              </h1>
              <p className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md">
                {data?.length} {data?.length < 2 ? "project" : "projects"}
              </p>
            </div>
            <div className="space-x-2 md:space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
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
          {!isLoading && !isError && !searchResultEmpty && (
            <div className="space-y-1 select-none bg-white text-[#25476A] font-semibold rounded-md p-1.5">
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
          )}
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              searchResult1?.length > 0 &&
              searchOn &&
              searchResult1?.map((user) => (
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

            {searchResultEmpty ? (
              <div className="flex justify-center items-center h-44">
                <div className="text-xl font-semibold text-[#25476A]">
                  No project found ! &#x1F61E;
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
                    className="grid grid-cols-11 col-span-11 border-r items-center p-2 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
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
                          <span className="w-full truncate text-center select-all text-sm">
                            {user?.meta?.locationAddress || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
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
