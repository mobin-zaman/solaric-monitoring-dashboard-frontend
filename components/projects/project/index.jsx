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
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getProjects, getProject, searchCompany } from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";
import CreateUserInProjectModal from "./createUserInProjectModal";
import AddCompanyModal from "../addCompanyModal";
import DeleteUserFromProjectModal from "./deleteUserFromProjectModal";
import DisableCompanyModal from "../disableCompanyModal";
import UpdateProjectModal from "./updateProjectModal";
import placeholderImage from "@/public/placeholderImage.jpg";
import Id from "@/public/icons/Id.png";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormatDateTime from "@/lib/FormatDateTime";

export default function Project({ projectId }) {
  const router = useRouter();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [deletedUserModalOpen, setDeletedUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);
  const [updateProjectModalOpen, setUpdateProjectModalOpen] = useState(false);
  const [projectUpdated, setProjectUpdated] = useState(false);
  const [searchResult1, setSearchResult1] = useState(null);
  const [userAdded, setUserAdded] = useState(false);
  const [companyAdded, setCompanyAdded] = useState(false);
  const [disableUserModalId, setDisableUserModalId] = useState(null);
  const [disableCompanyModalId, setDisableCompanyModalId] = useState(null);
  const [userDeletedFromProject, setUserDeletedFromProject] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["project", projectId],
    () => getProject(projectId),
    {
      enabled: projectId ? true : false,
    }
  );
  console.log(data);
  //when user is added, refetch the data
  useEffect(() => {
    if (userAdded) {
      refetch();
      setUserAdded(false);
    } else if (companyAdded) {
      refetch();
      setCompanyAdded(false);
    } else if (userDeletedFromProject) {
      refetch();
      setUserDeletedFromProject(false);
    } else if (companyDisabled) {
      refetch();
      setCompanyDisabled(false);
    }
  }, [refetch, userAdded, companyAdded, userDeletedFromProject, companyDisabled]);

  const [projectIdCopy, setProjectIdCopy] = useState(false);
  const [solarmanPlantIdCopy, setSolarmanPlantIdCopy] = useState(false);

  const handleCopy = (data) => {
    let valueToCopy = "";
    let isProjectIdCopy = false;
    let isSolarmanPlantIdCopy = false;

    if (data.projectId) {
      valueToCopy = data.projectId;
      isProjectIdCopy = true;
    } else if (data.solarmanPlantId) {
      valueToCopy = data.solarmanPlantId;
      isSolarmanPlantIdCopy = true;
    }

    try {
      navigator.clipboard.writeText(valueToCopy);
      if (isProjectIdCopy) {
        setProjectIdCopy(true);
        setSolarmanPlantIdCopy(false);
      } else if (isSolarmanPlantIdCopy) {
        setProjectIdCopy(false);
        setSolarmanPlantIdCopy(true);
      }

      setTimeout(() => {
        setProjectIdCopy(false);
        setSolarmanPlantIdCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  const handleCompanyClick = (companyId) => {
    router.push(`/company/${companyId}`);
  };

  // const searchData = useQuery(() => searchCompany(), {
  //   enabled: searchOn,
  // });

  const handleSearch = (e) => {
    const searchPromise = searchCompany({ search: e.target.value, projectId });

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

  const handleDisableUser = (id) => {
    setDeletedUserModalOpen(true);
    setDisableUserModalId(id);
  };

  const handleDisableCompany = (id) => {
    setDisableCompanyModalOpen(true);
    setDisableCompanyModalId(id);
  };

  const handleInverterClick = (inverterId) => {
    router.push(`/inverter/${inverterId}`);
  };

  const notifyForUserAdd = () => {
    console.log("notifyForUserAdd");
    toast.success("User Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForProjectAdd when newUserCreated is true
  useEffect(() => {
    if (userAdded) {
      console.log("userAdded");
      notifyForUserAdd();
    }
  }, [userAdded]);

  return (
    <>
      <div className="space-y-1.5 relative">
        <div className="sticky -top-0 z-50 bg-gray-200 rounded-b-md select-none">
          <div className="bg-gray-200 pb-1.5"></div>
          <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-[#25476A] rounded-md p-3.5">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Project Overview
              </h1>
              <div className="flex space-x-3">
                <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md">
                  <span>{data?.name}</span>
                </div>
                <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                  <span>Id:</span>
                  <span>{projectId}</span>
                  <button onClick={() => handleCopy({ projectId: data?.id })}>
                    {projectIdCopy ? (
                      <FontAwesomeIcon icon={faCopy} />
                    ) : (
                      <FontAwesomeIcon icon={faClipboard} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* <button
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-1"
              onClick={() => setUpdateProjectModalOpen(true)}
            >
              <span className="">Edit</span>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

            {updateProjectModalOpen && (
              <UpdateProjectModal
                editProjectData={data}
                updateProjectModalOpen={updateProjectModalOpen}
                projectUpdated={setProjectUpdated}
              />
            )} */}
          </div>
          <div className="bg-white rounded-md shadow-md flex">
          <Image
            src={data?.meta?.stationImage || "/Placeholder.png"}
            width={2000}
            height={2000}
            alt="logo"
            className="w-64 h-68 rounded-l-md object-cover"
          />
          <div className="flex space-x-3 p-6 w-full">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Solarman Plant Id:
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-[#25476A] font-semibold select-none">
                    {data?.solarmanPlantId}
                  </span>
                  <button
                    className="text-[#25476A]"
                    onClick={() =>
                      handleCopy({
                        solarmanPlantId: data?.solarmanPlantId,
                      })
                    }
                  >
                    {solarmanPlantIdCopy ? (
                      <FontAwesomeIcon icon={faCopy} />
                    ) : (
                      <FontAwesomeIcon icon={faClipboard} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Type:
                </p>
                <p className="text-gray-700">
                  {" "}
                  {data?.meta?.type
                    .replace(/_/g, " ") // Replace all '_' with ' '
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Installed Capacity (Wp):
                </p>
                <p className="text-gray-700">
                  {data?.meta?.installedCapacity.toFixed(1) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Owner Name:
                </p>
                <p className="text-gray-700">
                  {data?.meta?.ownerName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Contact:
                </p>
                <p className="text-gray-700">{data?.meta?.Contact || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Address:
                </p>
                <p className="text-gray-700">
                  {data?.meta?.locationAddress || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Total Users:
                </p>
                <p className="text-gray-700"> {data?.users?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Total Companies:
                </p>
                <p className="text-gray-700">{data?.companies?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Total Inverter:
                </p>
                <p className="text-gray-700">{data?.inverters?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Created Date & Time:
                </p>
                <p className="text-gray-700">
                  <FormatDateTime dateString={data?.createdAt} />
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Updated Date & Time:
                </p>
                <p className="text-gray-700">
                  <FormatDateTime dateString={data?.updatedAt} />
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium select-none">
                  Description:
                </p>
                <textarea
                  className="bg-gray-200 px-2 flex w-full h-6 rounded-md text-gray-700"
                  value={data?.description || ""}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className="grid grid-cols-1">
            <div className="flex justify-between items-center bg-[#2e5984] rounded-t-md p-3">
              <span className="text-lg font-semibold tracking-wide text-white">
                Users
              </span>
              <button
                className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-400 rounded-md space-x-1"
                onClick={() => setAddUserModalOpen(true)}
              >
                <span>Add</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              {addUserModalOpen && (
                <CreateUserInProjectModal
                  projectId={projectId}
                  projectName={data?.name}
                  userAdded={setUserAdded}
                  addUserModalOpen={setAddUserModalOpen}
                />
              )}
            </div>
            <div className="p-3 space-y-1.5 bg-white rounded-b-md">
            <div className="text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5">
                <div className="grid grid-cols-12 items-center h-9">
                  <div className="flex justify-center font-semibold tracking-wide col-span-6 md:col-span-5 lg:col-span-4">
                    Name
                  </div>
                  <div className="flex items-center justify-center font-semibold tracking-wide space-x-1.5 col-span-2 lg:col-span-1">
                    <span>Status</span>
                  </div>
                  <div className="lg:col-span-4 xl:col-span-3 hidden lg:block">
                    <div className="flex justify-center font-semibold tracking-wide">
                      Email
                    </div>
                  </div>
                  <div className="flex justify-center font-semibold tracking-wide col-span-2 lg:col-span-1">
                    Role
                  </div>
                  {/* <div className="flex justify-center font-semibold tracking-wide col-span-2">
                    Address
                  </div> */}
                  <div className="md:col-span-3 lg:col-span-2 xl:col-span-3"></div>
                </div>
              </div>
              <div className="space-y-1.5 h-64 overflow-y-auto">
                {data?.users?.map((user) => (
                  <div
                    className="bg-gray-200 rounded-md p-2"
                    key={Math.random()}
                  >
                    <div className="grid grid-cols-12 items-center py-[0.001rem]">
                      <div className="flex items-center font-medium space-x-2 px-5 col-span-6 md:col-span-5 lg:col-span-4">
                        <Image
                          src={placeholderImage}
                          alt="logo"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="select-text text-gray-700 font-semibold">
                            {user?.user?.name}
                          </div>
                          <div className="select-text flex items-center text-gray-700 text-xs space-x-1">
                            <span>ID:</span>
                            <span>{user.userId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center col-span-2 lg:col-span-1">
                        {user?.user?.status === "ACTIVE" ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                            <span className="text-[#38EB1A] font-medium text-sm">
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
                      <div className="lg:col-span-4 xl:col-span-3 hidden lg:block">
                        {/* <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {user?.user?.email || "N/A"}
                        </span> */}
                        <div className="flex justify-center select-all">
                          {user?.user?.email || "N/A"}
                        </div>
                      </div>
                      <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                        {user?.user?.role === "ADMIN" ? (
                          <div className="px-2 py-1 bg-[#66C38B] text-white font-medium rounded-md text-sm">
                            Admin
                          </div>
                        ) : null}
                        {user?.user?.role === "ENGINEER" ? (
                          <div className="px-2 py-1 bg-[#C36666] font-medium text-white rounded-md text-sm">
                            Engineer
                          </div>
                        ) : null}
                        {user?.user?.role === "USER" ? (
                          <div className="px-2 py-1 bg-[#C3C366] font-medium text-white rounded-md text-sm">
                            User
                          </div>
                        ) : null}
                      </div>
                      {/* <div className="flex col-span-2">
                        <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {user?.user?.address || "N/A"}
                        </span>
                      </div> */}
                      <div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3">
                        {" "}
                        <button
                          className="flex items-center space-x-1 text-sm"
                          onClick={() => handleDisableUser(user)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />{" "}
                          <span className="hidden xl:block">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {deletedUserModalOpen && (
                <DeleteUserFromProjectModal
                  project={data}
                  user={disableUserModalId}
                  userDeletedFromProject={setUserDeletedFromProject}
                  deletedUserModalOpen={setDeletedUserModalOpen}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex justify-between items-center bg-[#2e5984] rounded-t-md p-3">
              <span className="text-lg font-semibold tracking-wide text-white">
                Companies
              </span>
              <div className="space-x-5 flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    className="w-72 h-8 rounded-md border border-gray-300 pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
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
                  className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-400 rounded-md space-x-1"
                  onClick={() => setAddCompanyModalOpen(true)}
                >
                  <span>Add</span>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {addCompanyModalOpen && (
                <AddCompanyModal
                  projectId={projectId}
                  projectName={data?.name}
                  companyAdded={setCompanyAdded}
                  addCompanyModalOpen={setAddCompanyModalOpen}
                />
              )}
            </div>
            <div className="p-3 space-y-2 bg-white rounded-md">
            <div className="text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5">
                <div className="grid grid-cols-12 items-center h-9">
                  <div className="flex justify-center font-semibold tracking-wide col-span-9">
                    Name
                  </div>
                  <div className="flex justify-center font-semibold tracking-wide col-span-2">
                    Code
                  </div>
                  <div className=""></div>
                </div>
              </div>
              <div className="space-y-1.5 h-64 overflow-y-auto">
                {searchResult1?.length >= 0
                  ? searchResult1?.map((company) => (
                      <div
                        className="bg-gray-200 rounded-md p-2"
                        key={Math.random()}
                      >
                        <div className="grid grid-cols-12 items-center py-[0.001rem]">
                          <div
                            className="grid grid-cols-11 col-span-11 border-gray-300 hover:cursor-pointer"
                            onClick={() => {
                              handleCompanyClick(company.id);
                            }}
                          >
                            <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                              <Image
                                src={Placeholder}
                                alt="logo"
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="select-text text-gray-700 font-semibold">
                                  {company.name}
                                </div>
                                <div className="select-text flex items-center text-gray-700 text-xs space-x-1">
                                  <span>ID:</span>
                                  <span>{company.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center col-span-2">
                              <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                                {company.code}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="text-sm text-gray-700"
                              onClick={() => setDisableCompanyModalOpen(true)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </button>
                          </div>
                        </div>
                        {disableCompanyModalOpen && (
                          <DisableCompanyModal
                            projectId={projectId}
                            companyId={company.id}
                            disableCompanyModalOpen={setDisableCompanyModalOpen}
                          />
                        )}
                      </div>
                    ))
                  : data?.companies?.map((company) => (
                      <div
                        className="bg-gray-200 rounded-md p-2"
                        key={Math.random()}
                      >
                        <div className="grid grid-cols-12 items-center py-[0.001rem]">
                          <div
                            className="grid grid-cols-11 col-span-11 border-r border-gray-300 hover:cursor-pointer"
                            onClick={() => {
                              handleCompanyClick(company.id);
                            }}
                          >
                            <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                              <Image
                                src={Placeholder}
                                alt="logo"
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="select-text text-gray-700 font-semibold">
                                  {company.name}
                                </div>
                                <div className="select-text flex items-center text-gray-700 text-xs space-x-1">
                                  <span>ID:</span>
                                  <span>{company.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center col-span-2">
                              <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                                {company.code}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="text-sm text-gray-700"
                              onClick={() => handleDisableCompany(company.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              {disableCompanyModalOpen && (
                <DisableCompanyModal
                  projectId={projectId}
                  companyId={disableCompanyModalId}
                  companyDisabled={setCompanyDisabled}
                  disableCompanyModalOpen={setDisableCompanyModalOpen}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex justify-between items-center bg-[#2e5984] rounded-t-md p-3">
              <span className="text-lg font-semibold tracking-wide text-white">
                Inverters
              </span>
            </div>
            <div className="p-3 space-y-2 bg-white rounded-md">
            <div className="text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5">
                <div className="grid grid-cols-12 items-center h-9">
                  <div className="flex justify-center font-semibold tracking-wide col-span-9">
                    Device Serial Number
                  </div>
                  <div className="flex justify-center font-semibold tracking-wide col-span-3">
                    Device Id
                  </div>
                  {/* <div className=""></div> */}
                </div>
              </div>
              <div className="space-y-1.5 h-64 overflow-y-auto">
                {
                  // searchResult1?.length >= 0
                  //   ? searchResult1?.map((inverter) => (
                  //       <div
                  //         className="bg-gray-200 rounded-md p-2"
                  //         key={Math.random()}
                  //       >
                  //         <div className="grid grid-cols-12 items-center py-[0.001rem]">
                  //           <div
                  //             className="grid grid-cols-11 col-span-11"
                  //             onClick={() => {
                  //               handleInverterClick(inverter.id);
                  //             }}
                  //           >
                  //             <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                  //               <Image
                  //                 src={Placeholder}
                  //                 alt="logo"
                  //                 className="w-10 h-10 rounded-full"
                  //               />
                  //               <div>
                  //                 <div className="select-none text-gray-700 font-semibold">
                  //                   {inverter.deviceSn}
                  //                 </div>
                  //                 <div className="select-none flex items-center text-gray-700 text-xs space-x-1">
                  //                   <span>ID:</span>
                  //                   <span>{inverter.id}</span>
                  //                 </div>
                  //               </div>
                  //             </div>
                  //             <div className="flex items-center col-span-2">
                  //               <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                  //                 {inverter.deviceId}
                  //               </span>
                  //             </div>
                  //           </div>
                  //           <div className="flex justify-center">
                  //             <button
                  //               className="text-sm text-gray-700"
                  //               onClick={() => handleDelete(inverter.id)}
                  //             >
                  //               <FontAwesomeIcon icon={faTrashCan} /> Delete
                  //             </button>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     ))
                  //   :
                  data?.inverters?.map((inverter) => (
                    <div
                      className="bg-gray-200 rounded-md p-2"
                      key={Math.random()}
                    >
                      <div className="grid grid-cols-12 items-center py-[0.001rem]">
                        <div
                          className="grid grid-cols-12 col-span-12 border-r-2 hover:cursor-pointer"
                          onClick={() => {
                            handleInverterClick(inverter.id);
                          }}
                        >
                          <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                            <Image
                              src={Placeholder}
                              alt="logo"
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="select-none text-gray-700 font-semibold">
                                {inverter.deviceSn}
                              </div>
                              <div className="select-none flex items-center text-gray-700 text-xs space-x-1">
                                <span>ID:</span>
                                <span>{inverter.id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center col-span-3">
                            <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                              {inverter.deviceId}
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex justify-center">
                            <button
                              className="text-sm text-gray-700"
                              onClick={() => handleDelete(inverter.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </button>
                          </div> */}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
