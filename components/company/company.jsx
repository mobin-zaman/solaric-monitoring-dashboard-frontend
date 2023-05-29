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
import { getProjects, getCompany, searchBuilding } from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";
import AddCompanyModal from "./addBuildingModal";
import DisableCompanyModal from "./disableCompanyModal";
import placeholderImage from "@/public/placeholderImage.jpg";
import Id from "@/public/icons/Id.png";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";

export default function Project({ companyId }) {
  const router = useRouter();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [disableUserModalOpen, setDisableUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);
  const [searchResult1, setSearchResult1] = useState(null);
  const [buildingAdded, setBuildingAdded] = useState(false);
  const [buildingDeleted, setBuildingDeleted] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["project", companyId],
    () => getCompany(companyId),
    {
      enabled: companyId ? true : false,
    }
  );

  //when a new building is added, refetch the data
  useEffect(() => {
    if (buildingAdded) {
      refetch();
      setBuildingAdded(false);
    } else if (buildingDeleted) {
      refetch();
      setBuildingDeleted(false);
    }
  }, [buildingAdded, refetch, buildingDeleted]);


  const [projectIdCopy, setProjectIdCopy] = useState(false);
  const [solarmanPlantIdCopy, setSolarmanPlantIdCopy] = useState(false);
  const [buildingId, setBuildingId] = useState(null);

  const handleCopy = (data) => {
    let valueToCopy = "";
    let isProjectIdCopy = false;
    let isSolarmanPlantIdCopy = false;
  
    if (data.companyId) {
      valueToCopy = data.companyId;
      isProjectIdCopy = true;
    } else if (data.code) {
      valueToCopy = data.code;
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
      console.error('Error copying text:', error);
    }
  };
  const handleBuildingClick = (buildingId) => {
    router.push(`/building/${buildingId}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    setDisableCompanyModalOpen(true);
    setBuildingId(id);
  };

  const handleSearch = (e) => {
    const searchPromise = searchBuilding({ search: e.target.value, companyId });

    if (e.target.value.length < 0) {
      setSearchResult1(null);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            console.log(data);
            setSearchResult1(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        <div className="bg-[#25476A] rounded-md p-3.5">
          <div className="flex items-center justify-between space-x-3 select-none">
            <h1 className="text-xl font-semibold text-white tracking-wide">
              Company Overview
            </h1>
            <div className="flex space-x-2">
              <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>{data?.name}</span>
              </div>
              <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>Id:</span>
                <span>{companyId}</span>
                <button onClick={() => handleCopy({ companyId: data?.id })}>
                  {projectIdCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
              </div>
              {/* TODO */}
              {/* <button
                  className="px-3 py-1 text-white font-semibold bg-[#39B54A] rounded-md select-none"
                  onClick={() => setAddCompanyModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit 
                </button> */}
            </div>
          </div>
        </div>
        <div className="space-y-1 select-none bg-white rounded-md">
          <div className="font-medium border-r-2 p-1.5">
            <div className="flex space-x-3">
              <Image
                src={data?.meta?.stationImage || "/Placeholder.png"}
                width={2000}
                height={2000}
                alt="logo"
                className="w-28 h-28 rounded-full object-cover"
              />
              <div className="grid grid-cols-2 gap-20 w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">Code:</span>
                    <div className="space-x-1">
                      <span className="text-gray-700">{data?.code}</span>
                      <button
                        className="text-[#25476A]"
                        onClick={() =>
                          handleCopy({
                            code: data?.code,
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
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Project Id:
                    </span>
                    <span className="text-gray-700">
                      {data?.projectId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Project Name:
                    </span>
                    <span className="text-gray-700">
                      {data?.project?.meta?.name || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-2">
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Total Buildings:
                    </span>
                    <span className="text-gray-700">
                      {data?.buildings?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Created Date & Time:
                    </span>
                    <span className="text-gray-700">
                      <FormatDateTime dateString={data?.createdAt} />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Updated Date & Time:
                    </span>
                    <span className="text-gray-700">
                      <FormatDateTime dateString={data?.updatedAt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-1 select-none rounded-md">
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-3 space-y-2 bg-white rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold tracking-wide text-[#25476A]">
                  Buildings
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
                    className="px-3 py-1.5 text-white font-semibold bg-[#39B54A] rounded-md select-none"
                    onClick={() => setAddCompanyModalOpen(true)}
                  >
                    Add Building <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                {addCompanyModalOpen && (
                  <AddCompanyModal
                    companyId={companyId}
                    companyNames={data?.name}
                    buildingAdded={setBuildingAdded}
                    addCompanyModalOpen={setAddCompanyModalOpen}
                  />
                )}
              </div>
              <div className="space-y-1 select-none bg-gray-200 rounded-md p-1.5 border-y-2 text-[#25476A]">
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
                  ? searchResult1?.map((building) => (
                      <div
                        className="bg-gray-200 rounded-md p-2"
                        key={Math.random()}
                      >
                        <div className="grid grid-cols-12 items-center py-[0.001rem]">
                          <div
                            className="grid grid-cols-11 col-span-11"
                            onClick={() => {
                              handleBuildingClick(building.id);
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
                                  {building.name}
                                </div>
                                <div className="select-text flex items-center text-gray-700 text-xs space-x-1">
                                  <span>ID:</span>
                                  <span>{building.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center col-span-2">
                              <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                                {building.code}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="text-sm text-gray-700"
                              onClick={() => handleDelete(building.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : data?.buildings?.map((building) => (
                      <div
                        className="bg-gray-200 rounded-md p-2"
                        key={Math.random()}
                      >
                        <div className="grid grid-cols-12 items-center py-[0.001rem]">
                          <div
                            className="grid grid-cols-11 col-span-11 border-r border-gray-300 hover:cursor-pointer"
                            onClick={() => {
                              handleBuildingClick(building.id);
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
                                  {building.name}
                                </div>
                                <div className="select-text flex items-center text-gray-700 text-xs space-x-1">
                                  <span>ID:</span>
                                  <span>{building.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center col-span-2">
                              <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                                {building.code}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="text-sm text-gray-700"
                              onClick={() => handleDelete(building.id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        {disableCompanyModalOpen && (
          <DisableCompanyModal
            companyId={companyId}
            buildingId={buildingId}
            buildingDisabled={setBuildingDeleted}
            disableCompanyModalOpen={setDisableCompanyModalOpen}
          />
        )}
      </div>
    </>
  );
}
