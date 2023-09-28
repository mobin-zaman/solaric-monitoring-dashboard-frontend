import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCopy,
  faClipboard,
  faHouse,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMeter, searchCompany } from "@/lib/Helper";
import UpdateMeterModal from "./updateMeterModal";
import { useRouter } from "next/router";
import FormatDateTime from "@/lib/FormatDateTime";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

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
                <Link href="/meters">
                  <FontAwesomeIcon
                    icon={faCalculator}
                    className={`w-4 h-4`}
                    title="Meters"
                  />
                  <span className="ml-2">Meters</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg font-semibold text-gray-200 tracking-wide space-x-1 flex items-center"> 
                            <FontAwesomeIcon
                    icon={faCalculator}
                    className={`w-5 h-5`}
                    title="Meters"
                  />
               <span>Meter Overview</span>
              </h1>
              <div className="flex space-x-3">                
                <div className="text-gray-800 text-xs bg-gray-200 px-2.5 h-7 flex items-center justify-center rounded-xl space-x-1">
                  <span>Id:</span>
                  <span>{meterId}</span>
                </div>
              </div>
            </div>
            <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1"
                onClick={() => setUpdateMeterModalOpen(true)}
            > <FontAwesomeIcon icon={faPenToSquare} />
              <span className="">Update Meter</span>
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
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Import Meter Code:
              </p>
              <p className="text-gray-700 text-sm">{data?.importMeterCode || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Export Meter Code:
              </p>
              <p className="text-gray-700 text-sm">{data?.exportMeterCode || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Import Meter Serial Number:
              </p>
              <p className="text-gray-700 text-sm">
                {data?.importMeterSerialNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Export Meter Serial Number:
              </p>
              <p className="text-gray-700 text-sm">
                {data?.exportMeterSerialNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold select-none">
                Building Id:
              </p>
              <p className="text-gray-700 text-sm">{data?.buildingId || "N/A"}</p>
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
          </div>
        </div>
      </div>
    </>
  );
}
