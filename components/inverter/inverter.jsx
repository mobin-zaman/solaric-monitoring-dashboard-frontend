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
import { getInverters, getInverter, searchCompany } from "@/lib/Helper";
import Image from "next/image";
import TimestampConverter from "@/lib/TimestampConverter";
import AddUserModal from "./addUserModal";
import AddCompanyModal from "./addCompanyModal";
import DisableUserModal from "./disableUserModal";
import DisableCompanyModal from "./disableCompanyModal";
import placeholderImage from "@/public/placeholderImage.jpg";
import Id from "@/public/icons/Id.png";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";

export default function Project({ inverterId }) {
  console.log(inverterId);
  const router = useRouter();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [disableUserModalOpen, setDisableUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);
  const [searchResult1, setSearchResult1] = useState(null);
  
  const { data, isLoading, isFetching } = useQuery(
    ["project", inverterId],
    () => getInverter(inverterId),
    {
      enabled: inverterId ? true : false,
    }
  );

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

  return (
    <>
      <div className="space-y-2.5">
        <div className="bg-[#25476A] rounded-md p-3.5">
          <div className="flex items-center justify-between space-x-3 select-none">
            <h1 className="text-xl font-semibold text-white tracking-wide">
            Inverter Overview
            </h1>
            <div className="flex space-x-2">
              {/* <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>{data?.name}</span>
              </div> */}
              <div className="text-[#25476A] text-md bg-gray-200 py-1 px-4 rounded-md space-x-1 flex items-center">
                <span>Id:</span>
                <span>{inverterId}</span>
                <button onClick={() => handleCopy({ inverterId: data?.id })}>
                  {projectIdCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
              </div>
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
                    <span className="text-[#25476A] font-semibold">Device Serial Number:</span>
                    <div className="space-x-1">
                      <span className="text-gray-700">
                        {data?.deviceSn}
                      </span>
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
                    <span className="text-[#25476A] font-semibold">Device Id:</span>
                    <span className="text-gray-700">
                      {data?.deviceId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">Project Id:</span>
                    <span className="text-gray-700">
                      {data?.projectId || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-2">
                <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">Building Id:</span>
                    <span className="text-gray-700">
                      {data?.buildingId || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">Created Date & Time:</span>
                    <span className="text-gray-700">
                      <FormatDateTime dateString={data?.createdAt} />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b p-1.5">
                    <span className="text-[#25476A] font-semibold">Updated Date & Time:</span>
                    <span className="text-gray-700">
                      <FormatDateTime dateString={data?.updatedAt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
