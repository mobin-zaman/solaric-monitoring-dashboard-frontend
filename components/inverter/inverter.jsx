import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCopy,
  faClipboard,
  faHouse,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getInverter, searchCompany } from "@/lib/Helper";
import EditInverterModal from "./updateInverterModal";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";
import Link from "next/link";

export default function Project({ inverterId }) {
  const [editInverterModalOpen, setEditInverterModalOpen] = useState(false);
  const [inverterEdited, setInverterEdited] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["inverter", inverterId],
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
      console.error('Error copying text:', error);
    }
  };

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
                <Link href="/Inverters">
                  <FontAwesomeIcon
                    icon={faMicrochip}
                    className={`w-4 h-4`}
                    title="Inverters"
                  />
                  <span className="ml-2">Inverters</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center"> 
                            <FontAwesomeIcon
                    icon={faMicrochip}
                    className={`w-5 h-5`}
                    title="Inverters"
                  />
               <span>Inverter Overview</span>
              </h1>
              <div className="flex space-x-3">                
                <div className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl space-x-1">
                  <span>Id:</span>
                  <span>{inverterId}</span>
                </div>
              </div>
            </div>
            <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1"
                onClick={() => setEditInverterModalOpen(true)}
                > <FontAwesomeIcon icon={faPenToSquare} />
                <span className="">Update Inverter</span>
            </button>

            {editInverterModalOpen && (
              <EditInverterModal
                editInverterData={data}
                editInverterModalOpen={setEditInverterModalOpen}
                inverterEdited={setInverterEdited}
              />
            )}
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Device Serial Number:
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-[#25476A] font-semibold select-none text-sm">
                  {data?.deviceSn}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">Device Id:</p>
              <p className="text-gray-700 text-sm">{data?.deviceId || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">Code:</p>
              <p className="text-gray-700 text-sm">{data?.code || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">Capacity:</p>
              <p className="text-gray-700 text-sm">{data?.capacity || "N/A"} kWp</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">Project:</p>
              <p className="text-gray-700 text-sm">{data?.project?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">Building:</p>
              <p className="text-gray-700 text-sm">{data?.building?.name || "N/A"}</p>
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
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">Note:</p>
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
