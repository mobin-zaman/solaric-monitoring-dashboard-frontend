import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Router from "next/router";
import CreateProjectModal from "./createProjectModal";
import DeleteProjectModal from "./deleteProjectModal";
import { useQuery, useQueryClient } from "react-query";
import { getProjects, searchProject } from "@/lib/Helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faMagnifyingGlass,
  faHouse,
  faCubesStacked,
  faArrowUpWideShort,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Users() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [projectDeleted, setProjectDeleted] = useState(false);
  const [projectData, setProjectData] = useState();
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const { data, isLoading, isError } = useQuery(
    "projects",
    () => getProjects(),
    {
      enabled: true, //enable query
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries("projects");
  }, [queryClient]);

  const handleDeleteProject = (project) => {
    setDeleteProjectModalOpen(true);
    setProjectData(project);
  };

  const handleClickProject = (project) => {
    router.push(`/projects/${project.id}`);
  };

  const handleSearch = (e) => {
    setSearchOn(true);
    const searchPromise = searchProject(e.target.value);

    if (e.target.value.length < 1) {
      setSearchResult(null);
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
              setSearchResult(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // notifyForProjectAdd function to show toast notification when project is added
  const notifyForProjectAdd = () => {
    toast.success("Project Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForProjectAdd when projectCreated is true
  useEffect(() => {
    if (projectCreated) {
      notifyForProjectAdd();
      setProjectCreated(false);
    }
  }, [projectCreated]);

  // notifyForProjectDelete function to show toast notification when project is deleted
  const notifyForProjectDelete = () => {
    toast.error("Project Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForProjectDelete when projectDeleted is true
  useEffect(() => {
    if (projectDeleted) {
      notifyForProjectDelete();
      setProjectDeleted(false);
    }
  }, [projectDeleted]);

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
    if (sortKey === "name") {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKey] || "";
      const valueB = b[sortKey] || "";
      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKey === "solarmanPlantId") {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  const sortedSearchData = searchResult?.slice().sort((a, b) => {
    if (sortKey === "name") {
      const valueA = a[sortKey] || "";
      const valueB = b[sortKey] || "";
      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortKey === "solarmanPlantId") {
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
                <Link href="/projects">
                  <FontAwesomeIcon
                    icon={faCubesStacked}
                    className={`w-4 h-4`}
                    title="Dashboard"
                  />
                  <span className="ml-2">Projects</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
              <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center"> 
                            <FontAwesomeIcon
                    icon={faCubesStacked}
                    className={`w-5 h-5`}
                    title="Meters"
                  />               <span>Projects</span>
                </h1>
                <p className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl">
                  {data?.length} {data?.length < 2 ? "Project" : "Projects"}
                </p>
              </div>
              <div className="space-x-2 md:space-x-5 flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    className="w-48 md:w-56 h-7 lg:w-72 placeholder:text-xs rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                    placeholder="Search by name"
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
                onClick={() => setCreateProjectModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faCubesStacked} />
                  <span>Add Project</span>
                </button>
              </div>
              {createProjectModalOpen && (
                <CreateProjectModal
                  createProjectModalOpen={setCreateProjectModalOpen}
                  projectCreated={setProjectCreated}
                />
              )}
            </div>
            {!isLoading && !isError && !searchResultEmpty && (
            <div className="space-y-1 select-none bg-gray-600 text-gray-200 font-medium rounded-md p-1.5">
            <div className="grid grid-cols-12 items-center h-9 text-sm md:text-base">
                  <div
                    className="flex justify-center items-center col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3 space-x-1"
                    onClick={() => handleSort("name")}
                  >
                    <span>Name</span>
                    {sortKey === "name" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div
                    className="flex justify-center items-center col-span-4 sm:col-span-3 lg:col-span-2 space-x-1"
                    onClick={() => handleSort("solarmanPlantId")}
                  >
                    <span>Solarman Plant Id </span>
                    {sortKey === "solarmanPlantId" &&
                      (ascending ? (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                      ))}
                  </div>
                  <div className="hidden lg:block col-span-2 xl:col-span-1">
                    <div className="flex justify-center">Capacity</div>
                  </div>
                  <div className="hidden xl:block xl:col-span-2">
                    <div className="flex items-center justify-center">
                      Funding Type
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
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              searchResult?.length > 0 &&
              searchOn &&
              sortedSearchData?.map((project, index) => (
                <div
                  key={Math.random()}
                  className={`grid grid-cols-12 items-center rounded-md text-gray-700 border-2 ${index % 2 === 0 ? "bg-gray-100 border-gray-200" : "bg-gray-200 border-gray-300"} `}
                >
                  <div
                    className="grid grid-cols-11 col-span-11 border-r border-gray-300 items-center p-2 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                    onClick={() => handleClickProject(project)}
                  >
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3">
                      <Image
                        src={
                          project?.meta?.stationImage
                            ? project?.meta?.stationImage
                            : "/Placeholder.png"
                        }
                        width={1000}
                        height={1000}
                        alt="logo"
                        className="w-14 h-14 rounded-full"
                      />
                      <div>
                        <div className="select-text font-semibold">
                          {project.name}
                        </div>
                        <div className="select-none text-xs flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{project.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm col-span-4 sm:col-span-3 lg:col-span-2">
                      <span>{project.solarmanPlantId}</span>{" "}
                    </div>
                    <div className="select-all text-sm hidden lg:block col-span-2 xl:col-span-1">
                      <div className="flex justify-center">
                        {project?.meta?.installedCapacity ? (
                          <span>{project?.meta?.installedCapacity} kWp</span>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                    <div className="hidden xl:block xl:col-span-2">
                      <div className="flex justify-center select-all text-sm">
                        {project?.fundingType ? project.fundingType : "N/A"}
                      </div>
                    </div>
                    <div className="hidden lg:block col-span-3">
                      <div className="flex">
                        <span className="w-full truncate text-center select-all text-sm">
                          {project?.meta?.locationAddress || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center col-span-1">
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
                      onClick={() => handleDeleteProject(project)}
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
                  No project found ! &#x1F61E;
                </div>
              </div>
            ) : (
              ""
            )}

            {!searchResultEmpty &&
              !searchOn &&
              sortedData?.map((project, index) => (
                <div
                  key={Math.random()}
                  className={`grid grid-cols-12 items-center rounded-md text-gray-700 border ${index % 2 === 0 ? "bg-gray-100 border-gray-200" : "bg-gray-200 border-gray-300"} `}
                >
                  <div
                    className={`grid grid-cols-11 col-span-11 border-r border-gray-300 items-center p-2 cursor-pointer hover:rounded-l-md ${index % 2 === 0 ? "hover:bg-gray-200" : "hover:bg-gray-300"} `}
                    onClick={() => handleClickProject(project)}
                  >
                    <div className="flex items-center font-medium space-x-2 px-5 col-span-7 sm:col-span-5 lg:col-span-4 xl:col-span-3">
                      <Image
                        src={
                          project?.meta?.stationImage
                            ? project?.meta?.stationImage
                            : "/Placeholder.png"
                        }
                        width={1000}
                        height={1000}
                        alt="logo"
                        className="w-14 h-14 rounded-full"
                      />
                      <div>
                        <div className="select-text font-semibold">
                          {project.name}
                        </div>
                        <div className="select-none text-xs flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{project.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm col-span-4 sm:col-span-3 lg:col-span-2">
                      <span>{project.solarmanPlantId}</span>{" "}
                    </div>
                    <div className="select-all text-sm hidden lg:block col-span-2 xl:col-span-1">
                      <div className="flex justify-center">
                        {project?.meta?.installedCapacity ? (
                          <span>{project?.meta?.installedCapacity} kWp</span>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                    <div className="hidden xl:block xl:col-span-2">
                      <div className="flex justify-center select-all text-sm">
                        {project?.fundingType ? project.fundingType : "N/A"}
                      </div>
                    </div>
                    <div className="hidden lg:block col-span-3">
                      <div className="flex">
                        <span className="w-full truncate text-center select-all text-sm">
                          {project?.meta?.locationAddress || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center col-span-1">
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
                      onClick={() => handleDeleteProject(project)}
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
        {deleteProjectModalOpen && (
          <DeleteProjectModal
            deleteProjectModalOpen={setDeleteProjectModalOpen}
            deleteProjectData={projectData}
            projectDeleted={setProjectDeleted}
          />
        )}
      </div>
    </>
  );
}
