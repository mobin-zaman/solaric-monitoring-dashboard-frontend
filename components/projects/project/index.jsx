import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faMagnifyingGlass,
  faCopy,
  faClipboard,
  faHouse,
  faUserGroup,
  faEnvelope,
  faGear,
  faCalculator,
  faCubesStacked,
  faMicrochip,
  faPenToSquare,
  faRotate,
  faArrowUpWideShort,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getProject,
  searchCompany,
  updateInvertersInProject,
} from "@/lib/Helper";
import Image from "next/image";
import CreateUserInProjectModal from "./createUserInProjectModal";
import CreateCompanyInProjectModal from "./createCompanyInProjectModal";
import DeleteUserFromProjectModal from "./deleteUserFromProjectModal";
import DeleteCompanyFromProjectModal from "./deleteCompanyFromProjectModal";
import UpdateProjectModal from "./updateProjectModal";
import placeholderImage from "@/public/placeholderImage.jpg";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormatDateTime from "@/lib/FormatDateTime";
import Link from "next/link";
import ReactLoading from "react-loading";

export default function Project({ projectId }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [createUserInProjectModalOpen, setCreateUserInProjectModalOpen] =
    useState(false);
  const [createCompanyInProjectModalOpen, setCreateCompanyInProjectModalOpen] =
    useState(false);
  const [deleteUserFromProjectModalOpen, setDeleteUserFromProjectModalOpen] =
    useState(false);
  const [
    deleteCompanyFromProjectModalOpen,
    setDeleteCompanyFromProjectModalOpen,
  ] = useState(false);
  const [updateProjectModalOpen, setUpdateProjectModalOpen] = useState(false);
  const [projectUpdated, setProjectUpdated] = useState(false);

  const [userCreatedInProject, setUserCreatedInProject] = useState(false);
  const [companyCreatedInProject, setCompanyCreatedInProject] = useState(false);
  const [userDeletedFromProject, setUserDeletedFromProject] = useState(false);
  const [companyDeletedFromProject, setCompanyDeletedFromProject] =
    useState(false);

  const [searchResultCompany, setSearchResultCompany] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [projectIdCopy, setProjectIdCopy] = useState(false);
  const [solarmanPlantIdCopy, setSolarmanPlantIdCopy] = useState(false);

  // Get project data from api using useQuery hook
  const { data, isLoading, error } = useQuery(
    ["project", projectId],
    () => getProject(projectId),
    {
      enabled: projectId ? true : false,
      onSuccess: (data) => {
        setProjectData(data);
      },
      // refetchInterval: 1000,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries("project");
  }, [queryClient]);

  // Handle copy button for project id and solarman plant id
  const handleCopyButton = (data) => {
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

  // Handle click for company in project to redirect to company page
  const handleCompanyClick = (companyId) => {
    router.push(`/companies/${companyId}`);
  };

  // Handle search for company in project
  const handleCompanySearch = (e) => {
    const searchPromise = searchCompany({ search: e.target.value, projectId });

    if (e.target.value.length < 0) {
      setSearchResultCompany(null);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            setSearchResultCompany(data);
            console.log(searchResultCompany, "searchResultCompany");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // Handle delete user from project
  const handleDeleteUser = (user) => {
    setDeleteUserFromProjectModalOpen(true);
    setUserData(user);
  };

  // Handle delete company from project
  const handleDeleteCompany = (company) => {
    setDeleteCompanyFromProjectModalOpen(true);
    setCompanyData(company);
  };

  // Handle click for inverter in project to redirect to inverter page
  const handleInverterClick = (inverterId) => {
    router.push(`/inverters/${inverterId}`);
  };

  // Notify for user created from project
  const notifyForUserCreated = () => {
    toast.success("User Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForUserCreated when userCreatedInProject is true
  useEffect(() => {
    if (userCreatedInProject) {
      console.log("userCreatedInProject");
      notifyForUserCreated();
    }
  }, [userCreatedInProject]);

  // Notify for company created from project
  const notifyForCompanyCreated = () => {
    toast.success("Company Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForCompanyCreated when companyCreatedInProject is true
  useEffect(() => {
    if (companyCreatedInProject) {
      console.log("companyCreatedInProject");
      notifyForCompanyCreated();
    }
  }, [companyCreatedInProject]);

  // Notify for user deleted from project
  const notifyForUserDeleted = () => {
    toast.error("User Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForUserDeleted when userDeletedFromProject is true
  useEffect(() => {
    if (userDeletedFromProject) {
      console.log("userDeletedFromProject");
      notifyForUserDeleted();
    }
  }, [userDeletedFromProject]);

  // Notify for company deleted from project
  const notifyForCompanyDeleted = () => {
    toast.error("Company Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForCompanyDeleted when companyDeletedFromProject is true
  useEffect(() => {
    if (companyDeletedFromProject) {
      console.log("companyDeletedFromProject");
      notifyForCompanyDeleted();
    }
  }, [companyDeletedFromProject]);

  // Notify for project updated
  const notifyForProjectUpdated = () => {
    toast.success("Project Updated Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForProjectUpdated when projectUpdated is true
  useEffect(() => {
    if (projectUpdated) {
      console.log("projectUpdated");
      notifyForProjectUpdated();
    }
  }, [projectUpdated]);

  const [fakeLoader, setFakeLoader] = useState(false);

  const mutation = useMutation(updateInvertersInProject, {
    onSuccess: (data) => {
      if (data) {
        setFakeLoader(true);
        console.log(data);
        //refresh the page or project data
        queryClient.invalidateQueries("project");
      }
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleRefreshInverters = (e) => {
    setFakeLoader(true);
    mutation.mutate({
      projectId: parseInt(data?.id),
    });
  };

  useEffect(() => {
    if (!mutation?.isLoading) {
      setFakeLoader(false);
    }
  }, [mutation, fakeLoader]);

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
  const sortedData = data?.inverters?.slice().sort((a, b) => {
    if (sortKey === "deviceSn" || sortKey === "code") {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKey] || "";
      const valueB = b[sortKey] || "";
      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKey === "deviceId" || sortKey === "capacity") {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  //company sort
  const [sortKeyCompany, setSortKeyCompany] = useState(null);
  const [ascendingCompany, setAscendingCompany] = useState(true);

  const handleSortCompany = (key) => {
    if (sortKeyCompany === key) {
      // Toggle ascending/descending order if the same column is clicked
      setAscendingCompany(!ascendingCompany);
    } else {
      // Set the new sorting column and default to ascending order
      setSortKeyCompany(key);
      setAscendingCompany(true);
    }
  };

  // Sort the data based on the current sorting criteria
  const sortedDataCompany = data?.companies?.slice().sort((a, b) => {
    if (sortKeyCompany === "name" || sortKeyCompany === "code") {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKeyCompany] || "";
      const valueB = b[sortKeyCompany] || "";
      return ascendingCompany
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKeyCompany === "id") {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKeyCompany]);
      const valueB = Number(b[sortKeyCompany]);
      return ascendingCompany ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  const sortedSearchDataCompany = searchResultCompany?.slice().sort((a, b) => {
    if (sortKeyCompany === "name" || sortKeyCompany === "code") {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKeyCompany] || "";
      const valueB = b[sortKeyCompany] || "";
      return ascendingCompany
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKeyCompany === "id") {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKeyCompany]);
      const valueB = Number(b[sortKeyCompany]);
      return ascendingCompany ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  // user sort
  const [sortKeyUser, setSortKeyUser] = useState(null);
  const [ascendingUser, setAscendingUser] = useState(true);

  const handleSortUser = (key) => {
    if (sortKeyUser === key) {
      // Toggle ascending/descending order if the same column is clicked
      setAscendingUser(!ascendingUser);
    } else {
      // Set the new sorting column and default to ascending order
      setSortKeyUser(key);
      setAscendingUser(true);
    }
  };

  // Sort the data based on the current sorting criteria
  const sortedDataUser = data?.users?.slice().sort((a, b) => {
    if (sortKeyUser === "name") {
      // For strings (Name)
      const valueA = a?.user?.name || "";
      const valueB = b?.user?.name || "";
      return ascendingUser
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKeyUser === "id") {
      // For numeric columns (ID)
      const valueA = Number(a?.user?.id || 0);
      const valueB = Number(b?.user?.id || 0);
      return ascendingUser ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="space-y-1.5 relative">
        <div className="sticky -top-0 z-50 bg-gray-200 rounded-b-md select-none">
          <div className="text-sm breadcrumbs text-[#25476A]">
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
                <Link href="/projects">
                  <FontAwesomeIcon
                    icon={faCubesStacked}
                    className={`w-4 h-4`}
                    title="Dashboard"
                  />
                  <span className="ml-2">Projects</span>
                </Link>
              </li>
              <li>
                <Link href={`/projects/${data?.id}`}>
                  <span className="">{data?.name}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center">
                <FontAwesomeIcon
                  icon={faCubesStacked}
                  className={`w-5 h-5`}
                  title="Meters"
                />{" "}
                <span>Project Overview</span>
              </h1>
              <div className="flex space-x-3">
                <p className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl">
                  <span>{data?.name}</span>
                </p>
                <p className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl">
                  <span>Id:</span>
                  <span>{data?.solarmanPlantId}</span>
                </p>
              </div>
            </div>
            <button
              className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1"
              onClick={() => setUpdateProjectModalOpen(true)}
            >
              {" "}
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className="">Update Project</span>
            </button>

            {updateProjectModalOpen && (
              <UpdateProjectModal
                editProjectData={data}
                updateProjectModalOpen={setUpdateProjectModalOpen}
                projectUpdated={setProjectUpdated}
              />
            )}
          </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 w-full">
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Owner Name:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.meta?.ownerName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Contact:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.meta?.Contact || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Address:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.meta?.locationAddress || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Funding Type:
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-700">{data?.fundingType}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Type:
                </p>
                <p className="text-gray-700 text-sm">
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
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Installed Capacity (Wp):
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.meta?.installedCapacity.toFixed(1) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Tarrif:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.tarrif?.toFixed(0) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Dollar Rate:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.dollarRate?.toFixed(2) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Export Meter Serial Number:
                </p>
                <p className="text-gray-700 text-sm">
                  {Math.round(data?.exportMeterSerialNumber || 0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Import Meter Serial Number:
                </p>
                <p className="text-gray-700 text-sm">
                  {Math.round(data?.importMeterSerialNumber || 0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Total Users:
                </p>
                <p className="text-gray-700 text-sm">
                  {" "}
                  {data?.users?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Total Companies:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.companies?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Total Inverter:
                </p>
                <p className="text-gray-700 text-sm">
                  {data?.inverters?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Created Date & Time:
                </p>
                <p className="text-gray-700 text-sm">
                  <FormatDateTime dateString={data?.createdAt} />
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Updated Date & Time:
                </p>
                <p className="text-gray-700 text-sm">
                  <FormatDateTime dateString={data?.updatedAt} />
                </p>
              </div>
              {/* <div>
                <p className="text-gray-700 text-sm font-semibold select-none">
                  Description:
                </p>
                <textarea
                  className="bg-gray-200 px-2 flex w-full h-6 rounded-md text-gray-700 text-sm"
                  value={data?.description || ""}
                  disabled
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 select-none">
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center">
                Users
              </h1>
              <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{data?.users ? data?.users?.length : 0}</span>
                <span>{data?.users?.length > 1 ? "Users" : "User"}</span>
              </div>
            </div>
            <button
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-400 rounded-md space-x-1"
              onClick={() => setCreateUserInProjectModalOpen(true)}
            >
              <span>Add</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="p-3 space-y-1.5 bg-white rounded-b-md">
            <div className="text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9">
                <div className="grid grid-cols-10 col-span-11">
                  <div
                    className="flex justify-center items-center col-span-6 lg:col-span-4 space-x-1"
                    onClick={() => handleSortUser("name")}
                  >
                    <span>Name</span>
                    {sortKeyUser === "name" &&
                      (ascendingUser ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
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
                <div className="col-span-1 "></div>
              </div>
            </div>
            <div className="space-y-1.5 h-64 overflow-y-auto">
              {sortedDataUser?.map((user) => (
                <div
                  className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A]"
                  key={Math.random()}
                >
                  <div className="grid grid-cols-10 col-span-11 border-r border-gray-300 items-center p-2 hover:bg-gray-300 cursor-pointer hover:rounded-l-md">
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-6 lg:col-span-4">
                      <Image
                        src={placeholderImage}
                        alt="logo"
                        className="w-12 rounded-full"
                      />
                      <div>
                        <div className="select-text font-semibold">
                          {user?.user?.name}
                        </div>
                        <div className="select-text text-sm flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{user?.user?.id}</span>
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
                    <div className="hidden lg:block lg:col-span-4">
                      <div className="flex items-center justify-center select-all text-sm">
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
          </div>
        </div>
        <div className="grid grid-cols-1 select-none">
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center">
                Companies
              </h1>
              <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{data?.companies ? data?.companies?.length : 0}</span>{" "}
                <span>
                  {data?.companies?.length > 1 ? "Companies" : "Company"}
                </span>
              </div>
            </div>
            <div className="space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-72 h-8 rounded-md border border-gray-300 pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
                  placeholder="Search by name"
                  onChange={handleCompanySearch}
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
                onClick={() => setCreateCompanyInProjectModalOpen(true)}
              >
                <span>Add</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="p-3 space-y-1.5 bg-white rounded-b-md">
            <div className="text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9">
                <div className="grid grid-cols-12 items-center col-span-11">
                  <div
                    className="flex items-center justify-center col-span-9 space-x-1"
                    onClick={() => handleSortCompany("name")}
                  >
                    <span>Name</span>
                    {sortKeyCompany === "name" &&
                      (ascendingCompany ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div
                    className="flex items-center justify-center col-span-3 space-x-1"
                    onClick={() => handleSortCompany("code")}
                  >
                    <span>Code</span>
                    {sortKeyCompany === "code" &&
                      (ascendingCompany ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                </div>
                <div className="col-span-1"></div>
              </div>
            </div>
            <div className="space-y-1.5 h-64 overflow-y-auto">
              {searchResultCompany?.length >= 0
                ? sortedSearchDataCompany?.map((company) => (
                    <div
                      className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A]"
                      key={Math.random()}
                    >
                      <div
                        className="grid grid-cols-12 col-span-11 border-r border-gray-300 items-center p-2 hover:bg-gray-300 cursor-pointer hover:rounded-l-md"
                        onClick={() => {
                          handleCompanyClick(company.id);
                        }}
                      >
                        <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                          <Image
                            src={Placeholder}
                            alt="logo"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="select-text font-semibold">
                              {company?.name}
                            </div>
                            <div className="select-text text-sm flex items-center space-x-1">
                              <span>Id:</span>
                              <span>{company?.id}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center select-all text-sm col-span-3">
                          {company?.code}
                        </div>
                      </div>
                      <div className="flex justify-center col-span-1">
                        <button
                          className="flex items-center space-x-1 text-sm hover:text-red-500"
                          onClick={() => handleDeleteCompany(company)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          <span className="hidden xl:block">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                : sortedDataCompany?.map((company) => (
                    <div
                      className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A]"
                      key={Math.random()}
                    >
                      <div
                        className="grid grid-cols-12 col-span-11 border-r border-gray-300 items-center p-2 hover:bg-gray-300 cursor-pointer hover:rounded-l-md"
                        onClick={() => {
                          handleCompanyClick(company.id);
                        }}
                      >
                        <div className="flex items-center font-medium space-x-2 px-5 col-span-9">
                          <Image
                            src={Placeholder}
                            alt="logo"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="select-text font-semibold">
                              {company?.name}
                            </div>
                            <div className="select-text text-sm flex items-center space-x-1">
                              <span>Id:</span>
                              <span>{company?.id}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center select-all text-sm col-span-3">
                          {company?.code}
                        </div>
                      </div>
                      <div className="flex justify-center col-span-1">
                        <button
                          className="flex items-center space-x-1 text-sm hover:text-red-500"
                          onClick={() => handleDeleteCompany(company)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          <span className="hidden xl:block">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 select-none">
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center">
                Inverters
              </h1>
              <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{data?.inverters ? data?.inverters?.length : 0}</span>{" "}
                <span>
                  {data?.inverters?.length > 1 ? "Inverters" : "Inverter"}
                </span>
              </div>
            </div>
            <button
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-black bg-[#c7ef44] hover:bg-[#b5d93e] rounded-md space-x-1"
              onClick={() => handleRefreshInverters()}
            >
              <span className="">Refresh</span>
              <FontAwesomeIcon icon={faRotate} />
            </button>
          </div>
          {!fakeLoader ? (
            <div className="p-3 space-y-1.5 bg-white rounded-b-md">
              <div
                className={`text-[#25476A] bg-gray-200 font-medium rounded-md p-1.5 ${
                  sortedData?.length >= 5 ? "pr-7" : ""
                }`}
              >
                <div className="grid grid-cols-12 items-center h-9">
                  <div
                    className="flex justify-center items-center col-span-7 md:col-span-5 lg:col-span-4 xl:col-span-3 space-x-1"
                    onClick={() => handleSort("deviceSn")}
                  >
                    <span>Serial Number</span>{" "}
                    {sortKey === "deviceSn" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div
                    className="flex justify-center items-center col-span-5 md:col-span-4 lg:col-span-2 space-x-1"
                    onClick={() => handleSort("deviceId")}
                  >
                    <span>Device Id</span>{" "}
                    {sortKey === "deviceId" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div
                    className="col-span-3 xl:col-span-2 hidden lg:block text-center"
                    onClick={() => handleSort("capacity")}
                  >
                    <span>Capacity</span>{" "}
                    {sortKey === "capacity" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div className="hidden xl:block col-span-2 text-center">
                    <div
                      className="flex justify-center items-center space-x-1"
                      onClick={() => handleSort("code")}
                    >
                      <span>Code</span>{" "}
                      {sortKey === "code" &&
                        (ascending ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} />
                        ) : (
                          <FontAwesomeIcon icon={faArrowDownShortWide} />
                        ))}
                    </div>
                  </div>
                  <div className="col-span-3 hidden md:block text-center">
                    Building
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 h-64 overflow-y-auto">
                {sortedData?.map((inverter) => (
                  <div
                    key={Math.random()}
                    className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A] p-4 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                    onClick={() => handleInverterClick(inverter?.id)}
                  >
                    <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-7 md:col-span-5 lg:col-span-4 xl:col-span-3">
                      <div className="select-none font-semibold">
                        {inverter.deviceSn}
                      </div>
                      <div className="select-none text-xs flex items-center space-x-1">
                        <span>Id:</span>
                        <span>{inverter.id}</span>
                      </div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm col-span-5 md:col-span-4 lg:col-span-2">
                      <span>{inverter?.deviceId}</span>
                    </div>
                    <div className="justify-center select-all text-sm col-span-3 xl:col-span-2 hidden lg:block text-center">
                      {inverter?.capacity ? (
                        <span>{inverter?.capacity} kWp</span>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div className="select-all text-sm hidden xl:block col-span-2 text-center">
                      <div className="flex justify-center">
                        {inverter?.code ? inverter.code : "N/A"}
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:block w-full truncate text-center select-all text-gray-700 text-sm">
                      {inverter?.buildingId || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-white rounded-b-md flex items-center justify-center">
              <ReactLoading
                type="spokes"
                color="#25476A"
                height={50}
                width={50}
              />
            </div>
          )}
        </div>
      </div>
      {createUserInProjectModalOpen && (
        <CreateUserInProjectModal
          projectData={projectData}
          userCreatedInProject={setUserCreatedInProject}
          createUserInProjectModalOpen={setCreateUserInProjectModalOpen}
        />
      )}
      {deleteUserFromProjectModalOpen && (
        <DeleteUserFromProjectModal
          projectData={data}
          userData={userData}
          userDeletedFromProject={setUserDeletedFromProject}
          deleteUserFromProjectModalOpen={setDeleteUserFromProjectModalOpen}
        />
      )}
      {createCompanyInProjectModalOpen && (
        <CreateCompanyInProjectModal
          projectData={projectData}
          companyCreatedInProject={setCompanyCreatedInProject}
          createCompanyInProjectModalOpen={setCreateCompanyInProjectModalOpen}
        />
      )}
      {deleteCompanyFromProjectModalOpen && (
        <DeleteCompanyFromProjectModal
          projectData={projectData}
          companyData={companyData}
          companyDeletedFromProject={setCompanyDeletedFromProject}
          deleteCompanyFromProjectModalOpen={
            setDeleteCompanyFromProjectModalOpen
          }
        />
      )}
    </>
  );
}
