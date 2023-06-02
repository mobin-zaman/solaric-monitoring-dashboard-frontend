import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateInverter } from "@/lib/Helper";

export default function UpdateMeterModal({
  updateMeterModalOpen,
  meterUpdated,
  meterData,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [importMeterCode, setImportMeterCode] = useState("");
  const [exportMeterCode, setExportMeterCode] = useState("");
  const [importMeterSerialNumber, setImportMeterSerialNumber] = useState("");
  const [exportMeterSerialNumber, setExportMeterSerialNumber] = useState("");

  const mutation = useMutation(updateInverter, {
    onSuccess: () => {
      meterData(true);
      editInverterModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();

    mutation.mutate({
      meterId: parseInt(meterData?.id),
      importMeterCode,
      exportMeterCode,
      importMeterSerialNumber,
      exportMeterSerialNumber,
    });
  };

  return (
    <>
      <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-300 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-200 rounded-t-md px-6 py-3">
            <span className="text-[#25476A] font-semibold text-lg">
              Meter Update
            </span>
            <button
              className="opacity-80"
              onClick={() => updateMeterModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-yellow-800" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
            <div className="text-[#25476A] text-sm font-semibold bg-gray-200 px-2 h-8 flex items-center justify-center rounded-md space-x-1 shadow-md">
              <span>Meter Id:</span>
              <span>{meterData?.id}</span>
            </div>
            <div className="flex flex-col space-y-5">
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-base text-[#25476A] space-x-0.5">
                  <span>Import Meter Code</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter import meter code"
                    value={meterData?.importMeterCode}
                    onChange={(e) => setImportMeterCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-base text-[#25476A] space-x-0.5">
                  <span>Export Meter Code</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter export meter code"
                    value={meterData?.exportMeterCode}
                    onChange={(e) => setExportMeterCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-base text-[#25476A] space-x-0.5">
                  <span>Import Meter Serial Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter import meter serial number"
                    value={meterData?.importMeterSerialNumber}
                    onChange={(e) => setImportMeterSerialNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-[#373737] font-medium text-sm space-x-1">
                <div className="font-medium text-base text-[#25476A] space-x-0.5">
                  <span>Export Meter Serial Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-[#25476A]">
                  <input
                    className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter export meter serial number"
                    value={meterData?.exportMeterSerialNumber}
                    onChange={(e) => setExportMeterSerialNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-red-700 text-sm h-8 flex justify-center items-center">
                {errorMessage}
              </div>
              <button
                className="flex items-center justify-center px-5 h-8 text-md font-semibold text-white bg-[#795548] hover:bg-teal-400 rounded-md"
                onClick={handleAddUser}
                >
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
