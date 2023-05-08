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
import { getProjects, searchUser } from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";

export default function Project({ projectId }) {
  const [projectData, setProjectData] = useState([]);
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

  const [idCopy, setIdCopy] = useState(false);

  const handleSolarmanPlantIdCopy = (id) => {
    navigator.clipboard.writeText(id);
    setIdCopy(true);
    setTimeout(() => {
      setIdCopy(false);
    }, 2000);
  };

  return (
    <>
      <div className="w-full rounded-md">
        <div className="space-y-1 pb-1">
          <div className="flex items-center justify-between bg-white rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-[#373737] font-semibold text-xl">
                Project Management
              </h1>
              <div className="text-[#373737] text-md bg-gray-200 py-1 px-2 rounded-md space-x-1 flex items-center">
                <span>{projectData?.name}</span>
              </div>
              <div className="text-[#373737] text-md bg-gray-200 py-1 px-2 rounded-md space-x-1 flex items-center">
                <span>Id:</span>
                <span>{projectId}</span>
                <button onClick={() => handleSolarmanPlantIdCopy(projectId)}>
                  {idCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1 select-none bg-white rounded-md">
            <div className="grid grid-cols-3 gap">
              <div className="flex items-start justify-center font-medium border-r-2  p-1.5">
                <div className="flex space-x-3">
                  <Image
                    src={projectData?.meta?.stationImage || "/Placeholder.png"}
                    width={2000}
                    height={2000}
                    alt="logo"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  <div className="flex flex-col justify-center px-2">
                    <span className="text-sm">
                      Solarman Plant Id: {projectData?.solarmanPlantId}
                    </span>
                    <span className="text-sm">
                      Type:{" "}
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
                    <span className="text-sm flex space-x-1">
                      <span>Status:</span>
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
                    </span>
                    <span className="text-sm">
                      Installed Capacity (Wp):{" "}
                      {projectData?.meta?.installedCapacity || "N/A"}
                    </span>
                    <span className="text-sm flex space-x-1">
                      <span>Last Updated Time:</span>
                      <TimestampConverter
                        timestamp={projectData?.meta?.lastUpdateTime}
                      />
                    </span>
                    <span className="text-sm">
                      Owner Name: {projectData?.meta?.ownerName || "N/A"}
                    </span>
                    <span className="text-sm">
                      Contact: {projectData?.meta?.Contact || "N/A"}
                    </span>
                    <span className="text-sm">
                      Address: {projectData?.meta?.locationAddress || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
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
                </div>
                {projectData?.users?.map((user) => (
                  <div
                    className="flex justify-between bg-gray-200 rounded-md p-1.5"
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
                        <span className="text-[#373737] font-semibold text-md">
                          {user.user.name}
                        </span>
                        <span className="text-[#373737] font-semibold text-xs">
                          Id: {user.userId}
                        </span>
                        <span className="text-[#373737] font-semibold text-xs">
                          Status: {user.user.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#ff2f2f] text-lg mr-2">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="font-medium border-r-2 h-full p-1.5">
                <div className="flex justify-between items-center pb-1.5">
                  <span className="flex items-start justify-center space-x-1">
                    Companies
                  </span>
                  <button
                    className="px-2 py-1 text-sm text-white font-semibold bg-[#39B54A] rounded-md select-none"
                    onClick={() => setAddUserModalOpen(true)}
                  >
                    Add Company <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                {projectData?.companies?.map((user) => (
                  <div
                    className="flex justify-between bg-gray-200 rounded-md p-1.5"
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
                        <span className="text-[#373737] font-semibold text-md">
                          {user.name}
                        </span>
                        <span className="text-[#373737] font-semibold text-xs">
                          Code: {user.code}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#ff2f2f] text-lg mr-2">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
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
