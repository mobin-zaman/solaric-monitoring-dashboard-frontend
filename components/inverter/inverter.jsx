import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCopy,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getInverter, searchCompany } from "@/lib/Helper";
import EditInverterModal from "./editInverterModal";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";

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
              className="flex items-center justify-center px-4 h-8 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-md space-x-1"
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
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Device Serial Number:
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-[#25476A] font-semibold select-none">
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
              <p className="text-gray-700 text-sm font-medium select-none">Device Id:</p>
              <p className="text-gray-700">{data?.deviceId || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">Code:</p>
              <p className="text-gray-700">{data?.code || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">Capacity:</p>
              <p className="text-gray-700">{data?.capacity || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">Project:</p>
              <p className="text-gray-700">{data?.project?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">Building:</p>
              <p className="text-gray-700">{data?.building?.name || "N/A"}</p>
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
