import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCopy,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMeter, searchCompany } from "@/lib/Helper";
import UpdateMeterModal from "./updateMeterModal";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Project({ meterId }) {
  const [meterUpdated, setMeterUpdated] = useState(false);
  const [updateMeterModalOpen, setUpdateMeterModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["meter", meterId],
    () => getMeter(meterId),
    {
      enabled: meterId ? true : false,
    }
  );


  const [projectIdCopy, setProjectIdCopy] = useState(false);

  const handleCopy = (data) => {
    let valueToCopy = "";
    let isProjectIdCopy = false;

    if (data.projectId) {
      valueToCopy = data.projectId;
      isProjectIdCopy = true;
    }

    try {
      navigator.clipboard.writeText(valueToCopy);
      if (isProjectIdCopy) {
        setProjectIdCopy(true);
        setSolarmanPlantIdCopy(false);
      }
      setTimeout(() => {
        setProjectIdCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  // notifyForUpdateMeter is used to notify the user that the meter has been updated
  const notifyForUpdateMeter = () => {
    toast.info("Meter updated successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

    // Call notifyForUpdateMeter function when meterUpdated is true
  useEffect(() => {
    if (meterUpdated) {
      notifyForUpdateMeter();
      setMeterUpdated(false);
    }
  }, [meterUpdated]);


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
                Meter Overview
              </h1>
              <div className="flex space-x-3">
                <div className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                  <span>Id:</span>
                  <span>{meterId}</span>
                  <button onClick={() => handleCopy({ meterId: data?.id })}>
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
              onClick={() => setUpdateMeterModalOpen(true)}
            >
              <span className="">Edit</span>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

            {updateMeterModalOpen && (
              <UpdateMeterModal
                meterData={data}
                updateMeterModalOpen={setUpdateMeterModalOpen}
                meterUpdated={setMeterUpdated}
              />
            )}
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Import Meter Code:
              </p>
              <p className="text-gray-700">{data?.importMeterCode || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Export Meter Code:
              </p>
              <p className="text-gray-700">{data?.exportMeterCode || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Import Meter Serial Number:
              </p>
              <p className="text-gray-700">
                {data?.importMeterSerialNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Export Meter Serial Number:
              </p>
              <p className="text-gray-700">
                {data?.exportMeterSerialNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium select-none">
                Building Id:
              </p>
              <p className="text-gray-700">{data?.buildingId || "N/A"}</p>
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
          </div>
        </div>
      </div>
    </>
  );
}
