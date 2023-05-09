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
import { getProjects, getProject } from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";
import AddUserModal from "./addUserModal";
import AddCompanyModal from "./addCompanyModal";
import DisableUserModal from "./disableUserModal";
import DisableCompanyModal from "./disableCompanyModal";

export default function Project({ projectId }) {
  const [projectData, setProjectData] = useState([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [disableUserModalOpen, setDisableUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useQuery(
    "projects",
    () => getProjects(),
    {
      enabled: true, //enable query
    }
  );

  useEffect(() => {
    data?.map((project) => {
      if (project.id == projectId) {
        setProjectData(project);
      }
    });
    console.log(projectData);
  }, [data, projectId, projectData]);

  const [projectIdCopy, setProjectIdCopy] = useState(false);
  const [solarmanPlantIdCopy, setSolarmanPlantIdCopy] = useState(false);

  const handleCopy = (data) => {
    console.log(data.projectId);
    let valueToCopy = "";
    if (data.projectId) { 
      valueToCopy = data?.projectId;
      setProjectIdCopy(true);
      setSolarmanPlantIdCopy(false);
    } else if (data.solarmanPlantId) {
      valueToCopy = data?.solarmanPlantId;
      setProjectIdCopy(false);
      setSolarmanPlantIdCopy(true);
    }

    navigator.clipboard.writeText(valueToCopy);

    setTimeout(() => {
      setProjectIdCopy(false);
      setSolarmanPlantIdCopy(false);
    }, 2000);
  };

  return (
    <>
      <div className="w-full rounded-md">
        <div className="space-y-1 pb-1">
          <div className="flex items-center justify-between bg-white rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-[#373737] font-semibold text-xl">
                Overview
              </h1>
              <div className="text-[#373737] text-md bg-gray-200 py-1 px-2 rounded-md space-x-1 flex items-center">
                <span>{projectData?.name}</span>
              </div>
              <div className="text-[#373737] text-md bg-gray-200 py-1 px-2 rounded-md space-x-1 flex items-center">
                <span>Id:</span>
                <span>{projectId}</span>
                <button onClick={() => handleCopy({ projectId: projectId })}>
                  {projectIdCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1 select-none bg-white rounded-md">
            <div className="font-medium border-r-2 p-1.5">
              <div className="flex space-x-3">
                <Image
                  src={projectData?.meta?.stationImage || "/Placeholder.png"}
                  width={2000}
                  height={2000}
                  alt="logo"
                  className="w-36 h-36 rounded-full object-cover"
                />
                <div className="grid grid-cols-2 gap-20 w-full">
                  <div className="flex flex-col justify-center">
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Solarman Plant Id:</span>
                      <div className="space-x-1"><span>{projectData?.solarmanPlantId}</span>
                      <button onClick={() => handleCopy({ solarmanPlantId: projectData?.solarmanPlantId })}>
                  {solarmanPlantIdCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Type:</span>
                      <span>
                        {projectData?.meta?.type
                          .replace(/_/g, " ") // Replace all '_' with ' '
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Status:</span>
                      {projectData?.meta?.networkStatus ===
                      "PARTIAL_OFFLINE" ? (
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
                    <div className="flex justify-between text-sm p-1.5">
                      <span className="text-blue-800">Installed Capacity (Wp):</span>
                      <span>
                        {projectData?.meta?.installedCapacity || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-2">
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Last Updated Time:</span>
                      <TimestampConverter
                        timestamp={projectData?.meta?.lastUpdateTime}
                      />
                    </div>
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Owner Name:</span>
                      <span>{projectData?.meta?.ownerName || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b p-1.5">
                      <span className="text-blue-800">Contact:</span>
                      <span>{projectData?.meta?.Contact || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm p-1.5">
                      <span className="text-blue-800">Address:</span>
                      <span>{projectData?.meta?.locationAddress || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1 select-none bg-white rounded-md">
            <div className="grid grid-cols-2 h-80 gap">
              <div className="font-medium border-r-2 h-full p-1.5">
                <div className="flex justify-between items-center pb-1.5">
                  <span className="flex items-start justify-center space-x-1">
                    Users
                  </span>
                  <button
                    className="px-2 py-1 text-sm text-white font-semibold bg-[#39B54A] rounded-md select-none"
                    onClick={() => setAddUserModalOpen(true)}
                  >
                    Add User <FontAwesomeIcon icon={faPlus} />
                  </button>
                  {addUserModalOpen && (
                    <AddUserModal
                      projectId={projectId}
                      addUserModalOpen={setAddUserModalOpen}
                    />
                  )}
                </div>
                <div className="space-y-1.5">
                {projectData?.users?.map((user) => (
                  <div
                    className="flex justify-between bg-[#d1d9d2] rounded-md p-1.5"
                    key={Math.random()}
                  >
                    <div className="flex space-x-1.5">
                      <Image
                        src={
                          user?.meta?.stationImage || "/placeholderImage.jpg"
                        }
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-14 h-14 rounded-full border border-[#373737]"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-blue-800 font-semibold text-md">
                          {user.user.name}
                        </span>
                        <span className="text-blue-800 font-semibold text-xs">
                          Status: {user.user.status} | Id: {user.userId}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#ff2f2f] text-lg mr-2" onClick={() => setDisableUserModalOpen(true)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    {disableUserModalOpen && (
                      <DisableUserModal
                        projectId={projectId}
                        userId={user.userId}
                        disableUserModalOpen={setDisableUserModalOpen}
                      />
                    )}
                  </div>
                ))}</div>
              </div>
              <div className="font-medium border-r-2 h-full p-1.5">
                <div className="flex justify-between items-center pb-1.5">
                  <span className="flex items-start justify-center space-x-1">
                    Companies
                  </span>
                  <button
                    className="px-2 py-1 text-sm text-white font-semibold bg-[#39B54A] rounded-md select-none"
                    onClick={() => setAddCompanyModalOpen(true)}
                  >
                    Add Company <FontAwesomeIcon icon={faPlus} />
                  </button>
                  {addCompanyModalOpen && (
                    <AddCompanyModal
                      projectId={projectId}
                      addCompanyModalOpen={setAddCompanyModalOpen}
                    />
                  )}
                </div>
                {projectData?.companies?.map((user) => (
                  <div
                    className="flex justify-between bg-[#d1d9d2] rounded-md p-1.5"
                    key={Math.random()}
                  >
                    <div className="flex space-x-1.5">
                      <Image
                        src={user?.meta?.stationImage || "/Placeholder.png"}
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-14 h-14 rounded-full border border-[#373737]"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-blue-800 font-semibold text-md">
                          {user.name}
                        </span>
                        <span className="text-blue-800 font-semibold text-xs">
                          Code: {user.code}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#ff2f2f] text-lg mr-2" onClick={() => setDisableCompanyModalOpen(true)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    {disableCompanyModalOpen && (
                      <DisableCompanyModal
                        projectId={projectId}
                        companyId={user.id}
                        disableCompanyModalOpen={setDisableCompanyModalOpen}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
