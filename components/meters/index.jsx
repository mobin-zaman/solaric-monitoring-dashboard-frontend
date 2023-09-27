import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrashCan,
  faArrowUpWideShort,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getMeters, searchMeter, getBuilding } from "@/lib/Helper";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import DeleteMeterModal from "./deleteMeterModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Meters() {
  const router = useRouter();
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
  const [deleteMeterModalOpen, setDeleteMeterModalOpen] = useState(false);
  const [meterData, setMeterData] = useState(null);
  const [meterDeleted, setMeterDeleted] = useState(false);

  const { data, isLoading, isError } = useQuery("meters", () => getMeters(), {
    enabled: true, //enable query
  });

  const handleClickMeter = (meterId) => {
    router.push(`/meter/${meterId}`);
  };

  const handleSearch = (e) => {
    setSearchOn(true);
    const searchPromise = searchMeter(e.target.value);

    if (e.target.value.length < 1) {
      setSearchResult(null);
      setSearchOn(false);
      setSearchResultEmpty(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmpty(true);
            } else {
              setSearchResultEmpty(false);
              setSearchResult(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDeleteMeter = (meter) => {
    setDeleteMeterModalOpen(true);
    setMeterData(meter);
  };

  // notifyForMeterDeleted function to show toast notification when meter is deleted
  const notifyForMeterDeleted = () => {
    toast.error("Meter deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Call notifyForMeterDeleted function when meterDeleted state is true
  useEffect(() => {
    if (meterDeleted) {
      notifyForMeterDeleted();
      setMeterDeleted(false);
    }
  }, [meterDeleted]);

  const [sortKey, setSortKey] = useState(null);
  const [ascending, setAscending] = useState(true);

  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle ascending/descending order if the same column is clicked
      setAscending(!ascending);
    } else {
      // Set the new sorting column and default to ascending order
      setSortKey(key);
      setAscending(true);
    }
  };

  // Sort the data based on the current sorting criteria
  const sortedData = data?.slice().sort((a, b) => {
    if (sortKey === 'name' || sortKey === 'importMeterCode' || sortKey === 'exportMeterCode') {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'id' || sortKey === 'importMeterSerialNumber' || sortKey === 'exportMeterSerialNumber') {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  const sortedSearchData = searchResult?.slice().sort((a, b) => {
    if (sortKey === 'name' || sortKey === 'importMeterCode' || sortKey === 'exportMeterCode') {
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'id' || sortKey === 'importMeterSerialNumber' || sortKey === 'exportMeterSerialNumber') {
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="space-y-1.5 relative select-none">
        <div className="space-y-1.5 sticky -top-1.5 z-50 bg-gray-200 pt-0.5">
          <div className="flex items-center justify-between bg-gray-700 rounded-md p-3.5">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Meters
              </h1>
              {!isLoading && (
                <p className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                  <span>{data?.length}</span>
                  <span>{data?.length < 2 ? "Meter" : "Meters"}</span>
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                placeholder="Search by code or serial number"
                onChange={handleSearch}
              />
              <div className="absolute top-1.5 right-2.5">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-gray-400"
                />
              </div>
            </div>
          </div>
          {!isLoading && !isError && !searchResultEmpty && (
            <div className="text-white bg-gray-600 font-medium rounded-md p-1.5">
              <div className="grid grid-cols-12 items-center h-9 text-sm md:text-base">
                <div className="grid grid-cols-12 col-span-11 items-center h-9">
                  <div className="flex justify-center items-center col-span-2 space-x-1" onClick={() => handleSort('id')}><span>Id</span> {sortKey === 'id' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}</div>
                  <div className="flex justify-center items-center col-span-5 md:col-span-3 xl:col-span-2 space-x-1" onClick={() => handleSort('importMeterSerialNumber')}>
                    <span>Import Serial Number</span> {sortKey === 'importMeterSerialNumber' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
                  </div>
                  <div className="flex justify-center items-center col-span-5 md:col-span-3 xl:col-span-2 space-x-1" onClick={() => handleSort('exportMeterSerialNumber')}>
                  <span>Export Serial Number</span> {sortKey === 'exportMeterSerialNumber' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
                  </div>
                  <div className="col-span-2 hidden md:block text-center space-x-1" onClick={() => handleSort('importMeterCode')}>
                  <span>Import Code</span> {sortKey === 'importMeterCode' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
                  </div>
                  <div className="col-span-2 hidden md:block text-center space-x-1" onClick={() => handleSort('exportMeterCode')}>
                  <span>Export Code</span> {sortKey === 'exportMeterCode' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
                  </div>
                  <div className="col-span-2 hidden xl:block text-center">
                    Building Id
                  </div>
                </div>
                <div className=""></div>
              </div>
            </div>
          )}
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              searchResult?.length > 0 &&
              searchOn &&
              sortedSearchData?.map((meter) => (
                <div
                  key={Math.random()}
                  className="grid grid-cols-12 items-center bg-white rounded-md text-[#25476A]"
                >
                  <div
                    className="grid grid-cols-12 col-span-11 border-r items-center p-4 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                    onClick={() => handleClickMeter(meter?.id)}
                  >
                    <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-2">
                      <div className="select-none">{meter.id}</div>
                    </div>
                    <div className="select-all text-sm col-span-5 md:col-span-3 xl:col-span-2">
                      <div className="flex justify-center">
                        {meter?.importMeterSerialNumber || "N/A"}
                      </div>
                    </div>
                    <div className="flex col-span-5 md:col-span-3 xl:col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.exportMeterSerialNumber || "N/A"}
                      </span>
                    </div>
                    <div className=" justify-center select-none space-x-1 text-sm col-span-2 hidden md:block text-center">
                      <span>{meter?.importMeterCode || "N/A"}</span>
                    </div>
                    <div className=" justify-center select-all text-sm col-span-2 hidden md:block text-center">
                      {meter?.exportMeterCode || "N/A"}
                    </div>
                    <div className="col-span-2 hidden xl:block text-center">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.buildingId || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center col-span-1">
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
                      onClick={() => handleDeleteMeter(meter)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span className="hidden xl:block">Delete</span>
                    </button>
                  </div>
                </div>
              ))}

            {searchResultEmpty ? (
              <div className="flex justify-center items-center h-44">
                <div className="text-xl font-semibold text-[#25476A]">
                  No meter found by search ! &#x1F61E;
                </div>
              </div>
            ) : (
              ""
            )}

            {!searchResultEmpty &&
              !searchOn &&
              sortedData?.map((meter) => (
                <div
                  key={Math.random()}
                  className="grid grid-cols-12 items-center bg-white rounded-md text-[#25476A]"
                >
                  <div
                    className="grid grid-cols-12 col-span-11 border-r items-center p-4 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                    onClick={() => handleClickMeter(meter?.id)}
                  >
                    <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-2">
                      <div className="select-none">{meter.id}</div>
                    </div>
                    <div className="select-all text-sm col-span-5 md:col-span-3 xl:col-span-2">
                      <div className="flex justify-center">
                        {meter?.importMeterSerialNumber || "N/A"}
                      </div>
                    </div>
                    <div className="flex col-span-5 md:col-span-3 xl:col-span-2">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.exportMeterSerialNumber || "N/A"}
                      </span>
                    </div>
                    <div className=" justify-center select-none space-x-1 text-sm col-span-2 hidden md:block text-center">
                      <span>{meter?.importMeterCode || "N/A"}</span>
                    </div>
                    <div className=" justify-center select-all text-sm col-span-2 hidden md:block text-center">
                      {meter?.exportMeterCode || "N/A"}
                    </div>
                    <div className="col-span-2 hidden xl:block text-center">
                      <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                        {meter?.buildingId || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center col-span-1">
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-red-500"
                      onClick={() => handleDeleteMeter(meter)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span className="hidden xl:block">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {deleteMeterModalOpen && (
        <DeleteMeterModal
          deleteMeterModalOpen={setDeleteMeterModalOpen}
          meterData={meterData}
          meterDeleted={setMeterDeleted}
        />
      )}
    </>
  );
}
