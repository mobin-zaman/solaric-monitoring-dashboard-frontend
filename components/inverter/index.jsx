import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,
  faArrowUpWideShort,
  faArrowDownShortWide,
 } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getInverters, searchInverter } from "@/lib/Helper";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const { data, isLoading, isError } = useQuery(
    "inverters",
    () => getInverters(),
    {
      enabled: true, //enable query
    }
  );

  const handleClickInverter = (inverterId) => {
    router.push(`/inverter/${inverterId}`);
  };

  const handleSearch = (e) => {
    setSearchOn(true);
    const searchPromise = searchInverter(e.target.value);

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
    if (sortKey === 'deviceSn' || sortKey === 'code') {
      // For strings (Device Id, code, serial number)
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'deviceId' || sortKey === 'capacity') {
      // For numeric columns (Device Id, capacity)
      const valueA = Number(a[sortKey]);
      const valueB = Number(b[sortKey]);
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  const sortedSearchData = searchResult?.slice().sort((a, b) => {
    if (sortKey === 'deviceSn' || sortKey === 'code') {
      const valueA = a[sortKey] || '';
      const valueB = b[sortKey] || '';
      return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (sortKey === 'deviceId' || sortKey === 'capacity') {
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
          <div
            className="flex items-center justify-between bg-gray-700 rounded-md p-3.5"
          >
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Inverter
              </h1>
              {!isLoading && (
                <p className="text-[#373737] text-sm bg-gray-300 px-2 h-8 flex items-center justify-center rounded-md space-x-1">
                  <span>{data?.length}</span>
                  <span>{data?.length < 2 ? "inverter" : "inverters"}</span>
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-48 md:w-56 h-8 lg:w-72 placeholder:text-xs md:placeholder:text-sm rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm focus:outline-none focus:ring-0"
                placeholder="Search by serial number"
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
              <div className="grid grid-cols-12 items-center h-9">
              <div
            className="flex justify-center items-center col-span-5 lg:col-span-4 xl:col-span-3 cursor-pointer space-x-1"
            onClick={() => handleSort('deviceSn')}
          >
            <span>Serial Number</span> {sortKey === 'deviceSn' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
          </div>
          <div
            className="flex justify-center items-center col-span-4 md:col-span-3 lg:col-span-2 cursor-pointer space-x-1"
            onClick={() => handleSort('deviceId')}
          >
             <span>Device Id</span> {sortKey === 'deviceId' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
          </div>
          <div
            className="col-span-2 hidden lg:block text-center cursor-pointer"
            onClick={() => handleSort('capacity')}
          >
             <span>Capacity</span> {sortKey === 'capacity' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
          </div>
          <div className="hidden xl:block col-span-1">
            <div className="flex justify-center items-center cursor-pointer space-x-1" onClick={() => handleSort('code')}>
            <span>Code</span> {sortKey === 'code' && (ascending ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : <FontAwesomeIcon icon={faArrowDownShortWide} />)}
            </div>
          </div>
          <div
            className="flex justify-center col-span-3 md:col-span-2 cursor-pointer"          >
            Project
          </div>
          <div
            className="justify-center col-span-2 hidden md:block text-center cursor-pointer"
          >
            Building
          </div>
              </div>
            </div>
          )}
        </div>
        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {!searchResultEmpty &&
              searchResult?.length > 0 &&
              searchOn &&
              sortedSearchData?.map((inverter) => (
                <div
                  key={Math.random()}
                  className="grid grid-cols-12 items-center bg-white rounded-md text-[#25476A] p-4 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                  onClick={() => handleClickInverter(inverter?.id)}
                >
                  <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-5 lg:col-span-4 xl:col-span-3">
                    <div className="select-none font-semibold">
                      {inverter.deviceSn}
                    </div>
                    <div className="select-none text-xs flex items-center space-x-1">
                      <span>Id:</span>
                      <span>{inverter.id}</span>
                    </div>
                  </div>
                  <div className="flex justify-center select-none space-x-1 text-sm col-span-4 md:col-span-3 lg:col-span-2">
                    <span>{inverter?.deviceId}</span>
                  </div>
                  <div className="justify-center select-all text-sm col-span-2 hidden lg:block text-center">
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
                  <div className="flex col-span-3 md:col-span-2">
                    <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                      {inverter?.project?.meta?.name || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-2 hidden md:block text-center">
                    <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                      {inverter?.building?.name || "N/A"}
                    </span>
                  </div>
                </div>
              ))}

            {searchResultEmpty ? (
              <div className="flex justify-center items-center h-44">
                <div className="text-xl font-semibold text-[#25476A]">
                  No inverter found by search ! &#x1F61E;
                </div>
              </div>
            ) : (
              ""
            )}

            {!searchResultEmpty &&
              !searchOn &&
              sortedData?.map((inverter) => (
                <div
                  key={Math.random()}
                  className="grid grid-cols-12 items-center bg-white rounded-md text-[#25476A] p-4 hover:bg-[#F3F4F6] cursor-pointer hover:rounded-l-md"
                  onClick={() => handleClickInverter(inverter?.id)}
                >
                  <div className="flex items-center justify-center font-medium space-x-2 px-5 col-span-5 lg:col-span-4 xl:col-span-3">
                    <div className="select-none font-semibold">
                      {inverter.deviceSn}
                    </div>
                    <div className="select-none text-xs flex items-center space-x-1">
                      <span>Id:</span>
                      <span>{inverter.id}</span>
                    </div>
                  </div>
                  <div className="flex justify-center select-none space-x-1 text-sm col-span-4 md:col-span-3 lg:col-span-2">
                    <span>{inverter?.deviceId}</span>
                  </div>
                  <div className="justify-center select-all text-sm col-span-2 hidden lg:block text-center">
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
                  <div className="flex col-span-3 md:col-span-2">
                    <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                      {inverter?.project?.meta?.name || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-2 hidden md:block text-center">
                    <span className="w-full truncate text-center select-all text-gray-700 text-sm">
                      {inverter?.building?.name || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
