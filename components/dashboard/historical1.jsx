import { useEffect, useState } from "react";
import HistoricalPeakPower from "./historicalPeakPower";
import { getDailyViewCollectTime, getHistoricalData, getHistoricalDataWithDateKey } from "../../lib/Helper";
import { useQuery } from "react-query";

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
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      !selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        company: selectedOptionIdCompany,
      });
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        building: selectedOptionIdBuilding,
      });
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      selectedOptionIdBuilding &&
      selectedOptionIdInverter
    ) {
      setCollectionKey({
        inverter: selectedOptionIdInverter,
      });
    }
  }, [
    selectedOptionId,
    selectedOptionIdCompany,
    selectedOptionIdBuilding,
    selectedOptionIdInverter,
  ]);

  const [ defaultData, setDefaultData ] = useState(true);

  const {
    data: HistoricalData,
    isLoading: HistoricalDataIsLoading,
    error: HistoricalDataError,
  } = useQuery(
    ["HistoricalData", collectionKey],
    () => getHistoricalData(collectionKey),
    {
      enabled: !!collectionKey && defaultData,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

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
  const [uniqueDays1, setUniqueDays1] = useState([]);

  useEffect(() => {
    if (!DailyViewCollectTimeIsLoading && DailyViewCollectTimeData) {
      const tempYears = [];
      const tempMonthsDays = [];
      const tempDays = [];

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

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  function removeDuplicatesMonthsFromArray(arr) {
    return [...new Set(arr?.map((item) => item.split("-")[0]))];
  }

  useEffect(() => {
    setUniqueYears1(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths1(removeDuplicatesMonthsFromArray(monthsFromData));
    setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  // useEffect(() => {
  //   if (uniqueYears1.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedYear1(date[0]);
  //     } else {
  //       const sortedYears = uniqueYears1.sort(); // Sort the uniqueYears1 array
  //       const lastIdx = sortedYears.length - 1;
  //       setSelectedYear1(sortedYears[lastIdx]);
  //     }
  //   }
  // }, [uniqueYears1]);

  // useEffect(() => {
  //   if (uniqueMonths1.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedMonth1(date[1]);
  //     } else {
  //       const sortedMonths = uniqueMonths1.sort(); // Sort the uniqueMonths1 array
  //       const lastIdx = sortedMonths.length - 1;
  //       setSelectedMonth1(sortedMonths[lastIdx]);
  //     }
  //   }
  // }, [uniqueMonths1]);

  // useEffect(() => {
  //   if (monthsFromData.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedDay1(date[2]);
  //     } else {
  //       const sortedDays =       monthsFromData
  //       .filter((item) => item.split("-")[0] === selectedMonth1)
  //       .map((item) => item.split("-")[1])
  //       .sort((a, b) => a.localeCompare(b));

  //       const lastIdx = sortedDays.length - 1;
  //       setSelectedDay1(sortedDays[lastIdx]);
  //     }
  //   }
  // }, [selectedMonth1, monthsFromData]);

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

  const [ historicalDataStore, setHistoricalDataStore] = useState();

  useEffect(() => {
    if (!HistoricalDataWithDateKeyIsLoading && HistoricalDataWithDateKey) {
      setHistoricalDataStore(HistoricalDataWithDateKey);
    } else {
      setHistoricalDataStore(HistoricalData);
    }
  }, [HistoricalDataWithDateKey, HistoricalDataWithDateKeyIsLoading, HistoricalData]);

  const handleSelectedYear1 = (value) => {
    setDefaultData(false);
    setSelectedYear1(value);
  };

  const handleDefaultData = () => {
    setDefaultData(true);
    setSelectedYear1("");
    setSelectedMonth1("");
    setSelectedDay1("");
    setDateKey("");
    setHistoricalDataStore(HistoricalData);
  };

  useEffect(() => {
    setSelectedMonth1("");
    setSelectedDay1("");
  }, [selectedYear1]);

  useEffect(() => {
    setSelectedDay1("");
  }, [selectedMonth1]);

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
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-2.5">
        <div className="text-xl font-semibold tracking-wide text-[#25476A]">
          Historical
        </div>
        <div className="flex flex-col justify-center items-end col-span-3 space-y-3">
          <div className="flex space-x-4">
            <button
              className={`flex items-center justify-center h-6 p-2 text-sm font-semibold rounded-md select-none border border-[#39B54A] ${
                defaultData
                  ? "bg-[#39B54A] text-white"
                  : "bg-white text-[#39B54A]"
              }`}
              onClick={() => handleDefaultData()}
            >
              Default
            </button>
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedYear1 ? selectedYear1 : "Year"}
              onChange={(e) => handleSelectedYear1(e.target.value)}
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
              value={selectedMonth1 ? selectedMonth1 : "Month"}
              onChange={(e) => setSelectedMonth1(e.target.value)}
              disabled={!selectedYear1}
            >
              <option disabled>Month</option>
              {uniqueMonths1?.sort().map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {digitToMonth(item)}
                  </option>
                );
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedDay1 ? selectedDay1 : "Day"}
              onChange={(e) => setSelectedDay1(e.target.value)}
              disabled={!selectedMonth1}
            >
              <option disabled>Day</option>
              {monthsFromData
                ?.map((item, Index) => {
                  if (item.split("-")[0] === selectedMonth1) {
                    return item; // Return the original item
                  } else {
                    return null; // Skip items that don't match the condition
                  }
                })
                .filter((item) => item !== null) // Filter out null items
                .sort((a, b) => {
                  const aValue = a.split("-")[1];
                  const bValue = b.split("-")[1];
                  return aValue.localeCompare(bValue); // Sort based on the split value
                })
                .map((item, index) => (
                  <option key={index} value={item.split("-")[1]}>
                    {item.split("-")[1]}
                  </option>
                ))}
            </select>
          </div>
          <table className="table-fixed w-full border rounded-md select-none text-[#25476A] text-sm">
            <tbody className="text-center">
              <tr className="bg-gray-200 h-16 font-semibold">
                <td></td>
                <td>Prod</td>
                <td>Export</td>
                <td>Import</td>
                <td>Sun-Hrs</td>
              </tr>
              <tr className="h-12">
                <td>Today</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationToday?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.export?.today?.toFixed(
                   0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.import?.today?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursToday?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-12">
                <td>This Month</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationThisMonth?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.export?.thisMonth?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.import?.thisMonth?.toFixed(
                   0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursThisMonth?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-12">
                <td>This Year</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationThisYear?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.export?.thisYear?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.import?.thisYear?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursThisYear?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
              <tr className="h-12">
                <td>All Time</td>
                <td>
                  {historicalDataStore?.historicalTableData?.production?.totalGenerationAllTime?.toFixed(
                    2
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.export?.allTime?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.import?.allTime?.toFixed(
                    0
                  ) || 0}
                </td>
                <td>
                  {historicalDataStore?.historicalTableData?.sunHrs?.sunHoursTillToday?.toFixed(
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
