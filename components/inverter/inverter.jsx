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
import AddUserModal from "./editInverterModal";
import EditInverterModal from "./editInverterModal";
import Id from "@/public/icons/Id.png";
import Placeholder from "@/public/Placeholder.png";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";

export default function Project({ inverterId }) {
  console.log(inverterId);
  const router = useRouter();
  const [editInverterModalOpen, setEditInverterModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [disableUserModalOpen, setDisableUserModalOpen] = useState(false);
  const [disableCompanyModalOpen, setDisableCompanyModalOpen] = useState(false);
  const [searchResult1, setSearchResult1] = useState(null);
  const [inverterEdited, setInverterEdited] = useState(false);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["project", inverterId],
    () => getInverter(inverterId),
    {
      enabled: inverterId ? true : false,
    }
  );

  useEffect(() => {
    if (inverterEdited) {
      refetch();
      setInverterEdited(false);
    }
  }, [inverterEdited, refetch]);

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

  console.log(data, "data");

  return (
    <>
      <div className="space-y-1.5 relative">
        <div className="sticky -top-1.5 z-50 bg-gray-200 pt-0.5 select-none shadow-md">
          <div
            className={`flex items-center justify-between bg-[#25476A] rounded-md py-3.5 px-6 ${
              isLoading ? "animate-pulse" : "animate-pulse"
            }`}
          >
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Inverter Overview
              </h1>
              <div className="flex space-x-3">
                {/* <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                <span>{data?.name}</span>
              </div> */}
                <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
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
            <button
              className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-2"
              onClick={() => setEditInverterModalOpen(true)}
            >
              <span className="">Edit</span>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

            {editInverterModalOpen && (
              <EditInverterModal
                editInverterData={data}
                editInverterModalOpen={setEditInverterModalOpen}
                inverterEdited={setInverterEdited}
              />
            )}
            {/* {newUserCreated && (
              <div className="toast toast-end">
                <div className="alert alert-success">
                  <div>
                    <span>User Created successfully.</span>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 text-sm font-medium">
                Device Serial Number:
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-[#25476A] font-semibold">
                  {data?.deviceSn}
                </span>
                <button className="text-[#25476A] hover:text-blue-500">
                  {solarmanPlantIdCopy ? (
                    <FontAwesomeIcon icon={faCopy} />
                  ) : (
                    <FontAwesomeIcon icon={faClipboard} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Device Id:</p>
              <p className="text-gray-700">{data?.deviceId || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Code:</p>
              <p className="text-gray-700">{data?.code || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Capacity:</p>
              <p className="text-gray-700">{data?.capacity || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Project:</p>
              <p className="text-gray-700">{data?.project?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Building:</p>
              <p className="text-gray-700">{data?.building?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">
                Created Date & Time:
              </p>
              <p className="text-gray-700">
                <FormatDateTime dateString={data?.createdAt} />
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">
                Updated Date & Time:
              </p>
              <p className="text-gray-700">
                <FormatDateTime dateString={data?.updatedAt} />
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Note:</p>
              <textarea
                className="bg-gray-200 px-2 flex w-full h-6 rounded-md text-gray-700"
                value={data?.note || ""}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
