import { useEffect, useState } from "react";
import HistoricalPeakPower from "./historicalPeakPower";
import {
  getDailyViewCollectTime,
  getHistoricalData,
  getHistoricalDataWithDateKey,
} from "../../lib/Helper";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Historical({
  historicalDataForProject,
  historicalDataForProjectSunHrsBarChartData,
  selectedOptionIdInverter,
  selectedOptionIdBuilding,
  selectedOptionIdCompany,
  selectedOptionId,
}) {
  const [collectionKey, setCollectionKey] = useState({});

  useEffect(() => {
    if (
      selectedOptionId &&
      !selectedOptionIdCompany &&
      !selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        project: selectedOptionId,
      });
    } 
    
    // else if (
    //   selectedOptionId &&
    //   selectedOptionIdCompany &&
    //   !selectedOptionIdBuilding &&
    //   !selectedOptionIdInverter
    // ) {
    //   setCollectionKey({
    //     company: selectedOptionIdCompany,
    //   });
    // } else if (
    //   selectedOptionId &&
    //   selectedOptionIdCompany &&
    //   selectedOptionIdBuilding &&
    //   !selectedOptionIdInverter
    // ) {
    //   setCollectionKey({
    //     building: selectedOptionIdBuilding,
    //   });
    // } else if (
    //   selectedOptionId &&
    //   selectedOptionIdCompany &&
    //   selectedOptionIdBuilding &&
    //   selectedOptionIdInverter
    // ) {
    //   setCollectionKey({
    //     inverter: selectedOptionIdInverter,
    //   });
    // }
  }, [
    selectedOptionId,
    selectedOptionIdCompany,
    selectedOptionIdBuilding,
    selectedOptionIdInverter,
  ]);

  const [defaultData, setDefaultData] = useState(true);

  // const {
  //   data: HistoricalData,
  //   isLoading: HistoricalDataIsLoading,
  //   error: HistoricalDataError,
  // } = useQuery(
  //   ["HistoricalData", collectionKey],
  //   () => getHistoricalData(collectionKey),
  //   {
  //     enabled: !!collectionKey && defaultData,
  //     onSuccess: (data) => {
  //       console.log("data", data);
  //     },
  //   }
  // );

  const {
    data: DailyViewCollectTimeData,
    isLoading: DailyViewCollectTimeIsLoading,
    error: DailyViewCollectTimeError,
  } = useQuery(
    ["DailyViewCollectTime", collectionKey],
    () => getDailyViewCollectTime(collectionKey),
    {
      enabled: !!collectionKey,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

  const [yearsFromData, setYearsFromData] = useState([]);
  const [monthsFromData, setMonthsFromData] = useState([]);
  const [daysFromData, setDaysFromData] = useState([]);
  const [uniqueYears1, setUniqueYears1] = useState([]);
  const [uniqueMonths1, setUniqueMonths1] = useState([]);
  // const [uniqueDays1, setUniqueDays1] = useState([]);
  const [storeYearMonth1, setStoreYearMonth1] = useState([]);
  const [storeYearMonthDay1, setStoreYearMonthDay1] = useState([]);

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (!DailyViewCollectTimeIsLoading && DailyViewCollectTimeData) {
      const tempYears = [];
      const tempMonthsDays = [];
      const tempDays = [];
      const storeYearMonth = [];
      const storeYearMonthDay = [];
      storeYearMonth.push(
        ...DailyViewCollectTimeData?.map((item) => (item.split("-")[0] + "-" + item.split("-")[1]))
      );
      storeYearMonthDay.push(...DailyViewCollectTimeData?.map((item) => item.split("-")[0] + "-" + item.split("-")[1] + "-" + item.split("-")[2]));
      
      setStoreYearMonth1(removeDuplicatesFromArray(storeYearMonth));
      setStoreYearMonthDay1(removeDuplicatesFromArray(storeYearMonthDay));

      DailyViewCollectTimeData?.forEach((item) => {
        const [year, month, day] = item.split("-");
        tempYears.push(year);
        tempMonthsDays.push(month + "-" + day);
        tempDays.push(day);
      });

      setYearsFromData(tempYears);
      setMonthsFromData(tempMonthsDays);
      setDaysFromData(tempDays);
    }
  }, [DailyViewCollectTimeData, DailyViewCollectTimeIsLoading]);

  // function removeDuplicatesFromArray(arr) {
  //   return [...new Set(arr)];
  // }

  function removeDuplicatesMonthsFromArray(arr) {
    return [...new Set(arr?.map((item) => item.split("-")[0]))];
  }

  useEffect(() => {
    setUniqueYears1(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths1(removeDuplicatesMonthsFromArray(monthsFromData));
    // setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  useEffect(() => {
    if (uniqueYears1.length > 0) {
      setSelectedYear1(uniqueYears1[0]); // Remove the dot before [0]
    }
  }, [uniqueYears1]);

  useEffect(() => {
    if (uniqueMonths1.length > 0) {
      setSelectedMonth1(uniqueMonths1[0]);
    }
  }, [uniqueMonths1]);

  useEffect(() => {
    if(storeYearMonthDay1.length > 0){
      const sortedDays = storeYearMonthDay1
      .filter((item) => item.split("-")[0] === selectedYear1 && item.split("-")[1] === selectedMonth1)
      .map((item) => item.split("-")[2])
      .sort((a, b) => a.localeCompare(b));
      const lastIdx = sortedDays.length - 1;
      setSelectedDay1(sortedDays[lastIdx]);
    }
  }, [selectedMonth1, storeYearMonthDay1, selectedYear1]);

  const [dateKey, setDateKey] = useState("");

  useEffect(() => {
    if (selectedYear1 && selectedMonth1 && selectedDay1) {
      setDateKey(`${selectedYear1}-${selectedMonth1}-${selectedDay1}`);
    }
  }, [selectedYear1, selectedMonth1, selectedDay1]);

  const {
    data: HistoricalDataWithDateKey,
    isLoading: HistoricalDataWithDateKeyIsLoading,
    error: HistoricalDataWithDateKeyError,
  } = useQuery(
    ["HistoricalDataWithDateKey", collectionKey, dateKey],
    () => getHistoricalDataWithDateKey({ collectionKey, dateKey }),
    {
      enabled: !!collectionKey && !!dateKey,
      onSuccess: (data) => {
        console.log("HistoricalDataWithDateKey", data);
      },
    }
  );

  const [historicalDataStore, setHistoricalDataStore] = useState();

  useEffect(() => {
    if (!HistoricalDataWithDateKeyIsLoading && HistoricalDataWithDateKey) {
      setHistoricalDataStore(HistoricalDataWithDateKey);
    }
  }, [HistoricalDataWithDateKey, HistoricalDataWithDateKeyIsLoading]);

  // const handleSelectedYear1 = (value) => {
  //   setDefaultData(false);
  //   setSelectedYear1(value);
  // };

  // const handleDefaultData = () => {
  //   setDefaultData(true);
  //   setSelectedYear1("");
  //   setSelectedMonth1("");
  //   setSelectedDay1("");
  //   setDateKey("");
  //   setHistoricalDataStore(HistoricalData);
  // };

  // useEffect(() => {
  //   setSelectedMonth1("");
  //   setSelectedDay1("");
  // }, [selectedYear1]);

  // useEffect(() => {
  //   setSelectedDay1("");
  // }, [selectedMonth1]);

  const digitToMonth = (digit) => {
    switch (digit) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "Jan";
    }
  };

  return (
    <>
              <div className="text-md font-bold tracking-wide text-white border border-gray-600 flex items-center justify-center bg-gray-600 rounded-t-lg py-1.5">
              Historical Generation (MWH)
          </div>
      <div className="w-full h-96 bg-white p-3 rounded-b-lg space-y-2.5 border border-gray-300">
        <div className="flex flex-col justify-center items-center col-span-3 space-y-3">
          <div className="flex space-x-4">
            {/* <button
              className={`flex items-center justify-center h-6 p-2 text-sm font-semibold rounded-md select-none border-2 ${defaultData
                ? "bg-[#39B54A] text-white border-[#39B54A]"
                : "bg-white text-[#25476A] border-[#25476A]"
                }`}
              onClick={() => handleDefaultData()}
            >
              <FontAwesomeIcon icon={faGlobe} />
            </button> */}
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedYear1 ? selectedYear1 : "Year"}
              onChange={(e) => setSelectedYear1(e.target.value)}
            >
              <option disabled>Year</option>
              {uniqueYears1?.map((item, Index) => {
                return (
                  <option key={Index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedMonth1}
              onChange={(e) => setSelectedMonth1(e.target.value)}
              disabled={!selectedYear1}
            >
              <option disabled>Month</option>
              {
    storeYearMonth1.map((item1, index) => {
      if (item1.split("-")[0] === selectedYear1) {
        return (
          <option key={index} value={item1.split("-")[1]}>
            {digitToMonth(item1.split("-")[1])}
          </option>
        );
      }
      return null; // Make sure to return null when conditions are not met
    })
  }
            </select>
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedDay1 ? selectedDay1 : "Day"}
              onChange={(e) => setSelectedDay1(e.target.value)}
              disabled={!selectedMonth1}
            >
              <option disabled>Day</option>
              {storeYearMonthDay1
    .filter((item1) => 
      item1.split("-")[0] === selectedYear1 &&
      item1.split("-")[1] === selectedMonth1
    )
    .map((item1) => item1.split("-")[2]) // Extract day values
    .sort((a, b) => a.localeCompare(b)) // Sort day values
    .reverse() // Reverse the array order
    .map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ))}
            </select>
          </div>
          <table className="w-full border rounded-md select-none text-[#25476A] text-xs xl:text-sm">
            <tbody className="text-center">
              <tr className="bg-gray-200 h-8 font-semibold">
                <td></td>
                <td>Prod</td>
                <td>Export</td>
                <td>Import</td>
                <td>Sun-Hrs</td>
              </tr>
              <tr className="h-16">
                <td>Today</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationToday?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.export?.today || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.import?.today || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursToday?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-16">
                <td>This Month</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationThisMonth?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.export
                      ?.thisMonth || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.import
                      ?.thisMonth || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursThisMonth?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-16">
                <td>This Year</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationThisYear?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.export
                      ?.thisYear || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.import
                      ?.thisYear || 0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursThisYear?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-16">
                <td>All Time</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationAllTime?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.export?.allTime ||
                      0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {Math.round(
                    historicalDataStore?.historicalTableData?.import?.allTime ||
                      0
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursAllTime?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
