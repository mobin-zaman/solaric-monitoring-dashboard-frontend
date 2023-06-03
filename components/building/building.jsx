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
import {
  getProject,
  getProjects,
  getBuilding,
  searchInverterForBuilding,
  getMetersForBuilding,
  searchMeterForBuilding,
} from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";
import AddCompanyModal from "./addBuildingModal";
import DisableCompanyModal from "./disableCompanyModal";
import placeholderImage from "@/public/placeholderImage.jpg";
import Id from "@/public/icons/Id.png";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";
import Link from "next/link";
import {
  faHouse,
  faUserGroup,
  faEnvelope,
  faGear,
  faCalculator,
  faCubesStacked,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import CreateMeterInBuildingModal from "./createMeterInBuildingModal";

export default function Project({ buildingId }) {
  const router = useRouter();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [disableUserModalOpen, setDisableUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);
  const [searchResult1, setSearchResult1] = useState(null);
  const [inverterAdded, setInverterAdded] = useState(false);
  const [inverterDeleted, setInverterDeleted] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    ["building", buildingId],
    () => getBuilding(buildingId),
    {
      enabled: buildingId ? true : false,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const { data: metersForBuilding, isLoading: metersForBuildingLoading } =
    useQuery(
      ["metersForBuilding", buildingId],
      () => getMetersForBuilding(buildingId),
      {
        enabled: buildingId ? true : false,
      }
    );

  const project = useQuery(
    ["project", data?.company?.projectId],
    () => getProject(data?.company?.projectId),
    {
      enabled: data?.company?.projectId ? true : false,
    }
  );

  //when a new inverter is added, we need to refetch the data
  useEffect(() => {
    if (inverterAdded) {
      refetch();
      setInverterAdded(false);
    } else if (inverterDeleted) {
      refetch();
      setInverterDeleted(false);
    }
  }, [inverterAdded, inverterDeleted, refetch]);

  const [projectIdCopy, setProjectIdCopy] = useState(false);
  const [solarmanPlantIdCopy, setSolarmanPlantIdCopy] = useState(false);
  const [inverterId, setInverterId] = useState(null);

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
      console.error("Error copying text:", error);
    }
  };

  const handleInverterClick = (inverterId) => {
    router.push(`/inverter/${inverterId}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    setDisableCompanyModalOpen(true);
    setInverterId(id);
  };

  const handleSearch = (e) => {
    const searchPromise = searchInverterForBuilding({
      search: e.target.value,
      buildingId,
    });

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

  const handleClickMeter = (meterId) => {
    router.push(`/meter/${meterId}`);
  };

  const [meterSearchOn, setMeterSearchOn] = useState(false);
  const [meterSearchResult, setMeterSearchResult] = useState(null);
  const [meterSearchResultEmpty, setMeterSearchResultEmpty] = useState(false);
  const [createMeterInBuildingModalOpen, setCreateMeterInBuildingModalOpen] = useState(false);
const [meterCreatedInBuilding, setMeterCreatedInBuilding] = useState(false);
  const handleMeterSearch = (e) => {
    setMeterSearchOn(true);
    const searchPromise = searchMeterForBuilding({
      search: e.target.value,
      buildingId,
    });

    if (e.target.value.length < 1) {
      setMeterSearchResult(null);
      setMeterSearchOn(false);
      setMeterSearchResultEmpty(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setMeterSearchResultEmpty(true);
              setMeterSearchResult(null);
            } else {
              setMeterSearchResult(data);
              setMeterSearchResultEmpty(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <>
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
            <Link href="/project">
              <FontAwesomeIcon
                icon={faCubesStacked}
                className={`w-4 h-4`}
                title="Dashboard"
              />
              <span className="ml-2">Projects</span>
            </Link>
          </li>
          <li>
            <Link href={`/project/${project?.data?.id}`}>
              <span className="">{project?.data?.name}</span>
            </Link>
          </li>
          <li>
            <Link href={`/company/${data?.company?.id}`}>
              <span className="">{data?.company?.name}</span>
            </Link>
          </li>
          <li>
            <Link href={`/building/${data?.id}`}>
              <span className="">{data?.name}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-2.5">
        <div className="bg-[#25476A] rounded-md p-3.5">
          <div className="flex items-center justify-between space-x-3 select-none">
            <h1 className="text-xl font-semibold text-white tracking-wide">
              Building Overview
            </h1>
            <div className="flex space-x-2">
              <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>{data?.name}</span>
              </div>
              <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>Id:</span>
                <span>{buildingId}</span>
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
                      Company Id:
                    </span>
                    <span className="text-gray-700">
                      {data?.company?.id || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Company Name:
                    </span>
                    <span className="text-gray-700">
                      {data?.company?.name || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-2">
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">
                      Total Inverters:
                    </span>
                    <span className="text-gray-700">
                      {data?.inverters?.length || 0}
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
        <div className="grid grid-cols-1 select-none">
          <div className="flex justify-between items-center bg-[#2e5984] rounded-t-md p-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold tracking-wide text-white">
                Inverters
              </span>
              <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{data?.inverters ? data?.inverters?.length : 0}</span>{" "}
                <span>
                  {data?.inverters?.length > 1 ? "Inverters" : "Inverter"}
                </span>
              </div>
            </div>
            <div className="space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-72 h-8 rounded-md border border-gray-300 pl-3 pr-10 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#39B54A] focus:border-[#39B54A]"
                  placeholder="Search by device serial number"
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
          </div>
          <div className="p-3 space-y-1.5 bg-white rounded-b-md">
            <div className="text-[#25476A] bg-gray-200 font-semibold rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9">
                <div className="flex justify-center col-span-4 xl:col-span-3">
                  Device Serial Number
                </div>
                <div className="flex justify-center col-span-2">Device Id</div>
                <div className="flex justify-center col-span-2">Capacity</div>
                <div className="hidden xl:block col-span-1">
                  <div className="flex justify-center">Code</div>
                </div>
                <div className="flex justify-center col-span-2">Project Id</div>
                <div className="flex justify-center col-span-2">
                  Building Id
                </div>
              </div>
            </div>
            <div className="space-y-1.5 h-64 overflow-y-auto">
              {searchResult1?.length >= 0
                ? searchResult1?.map((inverter) => (
                    <div
                      key={Math.random()}
                      className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A] p-4 hover:bg-gray-300 cursor-pointer hover:rounded-l-md"
                      onClick={() => handleInverterClick(inverter?.id)}
                    >
                      <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-4 xl:col-span-3">
                        <div className="select-none font-semibold">
                          {inverter.deviceSn}
                        </div>
                        <div className="select-none text-xs flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{inverter.id}</span>
                        </div>
                      </div>
                      <div className="flex justify-center select-none space-x-1 text-sm col-span-2">
                        <span>{inverter?.deviceId}</span>
                      </div>
                      <div className="flex justify-center select-all text-sm col-span-2">
                        {inverter?.capacity ? (
                          <span>{inverter?.capacity} kWp</span>
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div className="select-all text-sm hidden xl:block col-span-1">
                        <div className="flex justify-center">
                          {inverter?.code ? inverter.code : "N/A"}
                        </div>
                      </div>
                      <div className="flex col-span-2">
                        <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {inverter?.projectId || "N/A"}
                        </span>
                      </div>
                      <div className="flex col-span-2">
                        <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {inverter?.buildingId || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))
                : data?.inverters?.map((inverter) => (
                    <div
                      key={Math.random()}
                      className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A] p-4 hover:bg-gray-300 cursor-pointer hover:rounded-l-md"
                      onClick={() => handleInverterClick(inverter?.id)}
                    >
                      <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-4 xl:col-span-3">
                        <div className="select-none font-semibold">
                          {inverter.deviceSn}
                        </div>
                        <div className="select-none text-xs flex items-center space-x-1">
                          <span>Id:</span>
                          <span>{inverter.id}</span>
                        </div>
                      </div>
                      <div className="flex justify-center select-none space-x-1 text-sm col-span-2">
                        <span>{inverter?.deviceId}</span>
                      </div>
                      <div className="flex justify-center select-all text-sm col-span-2">
                        {inverter?.capacity ? (
                          <span>{inverter?.capacity} kWp</span>
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div className="select-all text-sm hidden xl:block col-span-1">
                        <div className="flex justify-center">
                          {inverter?.code ? inverter.code : "N/A"}
                        </div>
                      </div>
                      <div className="flex col-span-2">
                        <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {inverter?.projectId || "N/A"}
                        </span>
                      </div>
                      <div className="flex col-span-2">
                        <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                          {inverter?.buildingId || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 select-none">
          <div className="flex justify-between items-center bg-[#2e5984] rounded-t-md p-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold tracking-wide text-white">
                Meters
              </span>
              <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{metersForBuilding ? metersForBuilding?.length : 0}</span>
                <span>
                  {metersForBuilding?.length > 1 ? "meters" : "meter"}
                </span>
              </div>
            </div>
            <div className="space-x-5 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                  placeholder="Search by code or serial number"
                  onChange={handleMeterSearch}
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
                onClick={() => setCreateMeterInBuildingModalOpen(true)}
              >
                <span>Add</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="p-3 space-y-1.5 bg-white rounded-b-md">
            <div className="text-[#2e5984] bg-gray-200 font-semibold rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9 text-sm md:text-base">
                <div className="flex justify-center col-span-2">Id</div>
                <div className="flex justify-center col-span-2">
                  Import Code
                </div>
                <div className="flex justify-center col-span-2">
                  Export Code
                </div>
                <div className="flex justify-center col-span-2">
                  Import Serial Number
                </div>
                <div className="flex justify-center col-span-2">
                  Export Serial Number
                </div>
                <div className="flex justify-center col-span-2">
                  Building Id
                </div>
              </div>
            </div>
            <div className="space-y-1.5 h-64 overflow-y-auto">
              {!meterSearchResultEmpty &&
                meterSearchResult?.length > 0 &&
                meterSearchOn &&
                meterSearchResult?.map((meter) => (
                  <div
                    key={Math.random()}
                    className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A] p-4 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleClickMeter(meter?.id)}
                  >
                    <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-2">
                      <div className="select-none">{meter.id}</div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm col-span-2">
                      <span>{meter?.importMeterCode || "N/A"}</span>
                    </div>
                    <div className="flex justify-center select-all text-sm col-span-2">
                      {meter?.exportMeterCode || "N/A"}
                    </div>
                    <div className="select-all text-sm hidden xl:block col-span-2">
                      <div className="flex justify-center">
                        {meter?.importMeterSerialNumber || "N/A"}
                      </div>
                    </div>
                    <div className="flex col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.exportMeterSerialNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.buildingId || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              {meterSearchResultEmpty ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-xl font-semibold text-[#25476A]">
                    No meter found by search ! &#x1F61E;
                  </div>
                </div>
              ) : (
                ""
              )}
              {!meterSearchResultEmpty &&
                !meterSearchOn &&
                metersForBuilding?.map((meter) => (
                  <div
                    key={Math.random()}
                    className="grid grid-cols-12 items-center bg-gray-200 rounded-md text-[#25476A] p-4 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleClickMeter(meter?.id)}
                  >
                    <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-2">
                      <div className="select-none">{meter.id}</div>
                    </div>
                    <div className="flex justify-center select-none space-x-1 text-sm col-span-2">
                      <span>{meter?.importMeterCode || "N/A"}</span>
                    </div>
                    <div className="flex justify-center select-all text-sm col-span-2">
                      {meter?.exportMeterCode || "N/A"}
                    </div>
                    <div className="select-all text-sm hidden xl:block col-span-2">
                      <div className="flex justify-center">
                        {meter?.importMeterSerialNumber || "N/A"}
                      </div>
                    </div>
                    <div className="flex col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.exportMeterSerialNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.buildingId || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {disableCompanyModalOpen && (
          <DisableCompanyModal
            inverterId={inverterId}
            inverterDeleted={setInverterDeleted}
            disableCompanyModalOpen={setDisableCompanyModalOpen}
          />
        )}
      </div>
      {addCompanyModalOpen && (
        <AddCompanyModal
          buildingId={buildingId}
          buildingName={data?.name}
          inverterAdded={setInverterAdded}
          addCompanyModalOpen={setAddCompanyModalOpen}
        />
      )}
      {createMeterInBuildingModalOpen && (
        <CreateMeterInBuildingModal
          buildingData={data}
          meterCreatedInBuilding={setMeterCreatedInBuilding}
          createMeterInBuildingModalOpen={setCreateMeterInBuildingModalOpen}
        />
      )}
    </>
  );
}
