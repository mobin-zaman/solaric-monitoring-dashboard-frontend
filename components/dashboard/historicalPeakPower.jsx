import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { useQuery, useMutation } from "react-query";
import { getDailyViewCollectTime, getHistoricalPeakPowerData } from "@/lib/Helper";

export default function HistoricalPeakPower({
  selectedOptionId,
  selectedOptionIdCompany,
  selectedOptionIdBuilding,
  selectedOptionIdInverter,
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
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);

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
    setUniqueYears(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths(removeDuplicatesMonthsFromArray(monthsFromData));
    setUniqueDays(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  // const [yearsFromData, setYearsFromData] = useState([]);
  // const [monthsFromData, setMonthsFromData] = useState([]);
  // const [uniqueYears, setUniqueYears] = useState([]);
  // const [uniqueMonths, setUniqueMonths] = useState([]);

  // useEffect(() => {
  //   if (!isLoading && historicalPeakPowerData) {
  //     const tempYears = [];
  //     const tempMonths = [];

  //     Object.keys(historicalPeakPowerData)?.map((item) => {
  //       const [year, month] = item.split("-");
  //       tempYears.push(year);
  //       tempMonths.push(month);
  //     });

  //     setYearsFromData(tempYears);
  //     setMonthsFromData(tempMonths);
  //   }
  // }, [isLoading, historicalPeakPowerData]);

  // function removeDuplicatesFromArray(arr) {
  //   return [...new Set(arr)];
  // }

  // useEffect(() => {
  //   setUniqueYears(removeDuplicatesFromArray(yearsFromData));
  //   setUniqueMonths(removeDuplicatesFromArray(monthsFromData));
  // }, [yearsFromData, monthsFromData]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [storeYearlyData, setStoreYearlyData] = useState([]);
  const [storeMonthlyData, setStoreMonthlyData] = useState([]);

  useEffect(() => {
    if (uniqueYears.length > 0) {
      if (localStorage.getItem("date")) {
        const date = localStorage.getItem("date").split("-");
        setSelectedYear(date[0]);
      } else {
        const sortedYears = uniqueYears.sort(); // Sort the uniqueYears1 array
        const lastIdx = sortedYears.length - 1;
        setSelectedYear(sortedYears[lastIdx]);
      }
    }
  }, [uniqueYears]);

  const [dateKey, setDateKey] = useState("");

  useEffect(() => {
    if (selectedYear && selectedMonth == "Month") {
      setDateKey(selectedYear);
    } else if (selectedYear && selectedMonth != "Month") {
      setDateKey(selectedYear + "-" + selectedMonth);
    }
  }, [selectedYear, selectedMonth]);

  const {
    data: historicalPeakPowerData,
    isLoading : historicalPeakPowerDataIsLoading,
    error : historicalPeakPowerDataError
  } = useQuery(
    ["historicalPeakPowerData", collectionKey, dateKey],
    () => getHistoricalPeakPowerData({ collectionKey, dateKey }),
    {
      enabled: !!collectionKey && !!dateKey,
      onSuccess: (data) => {
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
      },
    }
  );

  const [storeHistoricalPeakPowerData, setStoreHistoricalPeakPowerData] = useState([]);

  useEffect(() => {
    if (!historicalPeakPowerDataIsLoading && historicalPeakPowerData) {
      setStoreHistoricalPeakPowerData(historicalPeakPowerData?.map((item) => ({
        name: item.date.split("-").slice(-1)[0],
        peakPower: item.peakPower,
      })));
    }
  }, [historicalPeakPowerData, historicalPeakPowerDataIsLoading]);


  useEffect(() => {
    if (historicalPeakPowerData) {
      const monthlyData = Object.keys(historicalPeakPowerData)
        .map((item) => {
          const [year, month] = item.split("-");
          if (year === selectedYear && month === selectedMonth) {
            return historicalPeakPowerData[item]?.dayWisePeakPower?.map(
              (dayItem) => ({
                name: dayItem.day.split("-")[2],
                peakPower: dayItem.peakPower,
              })
            );
          }
          return null; // Return null for months that don't match the selected month
        })
        .filter(Boolean); // Filter out null values

      setStoreMonthlyData(monthlyData.flat());
    }
  }, [historicalPeakPowerData, selectedYear, selectedMonth]);

  useEffect(() => {
    setSelectedMonth("Month");
  }, [selectedYear]);

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
      <div className="flex flex-col col-span-4 h-72 space-y-3">
        <div className="flex space-x-3 justify-end">
          <select
            className="flex items-center justify-center px-2.5 h-7 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
          >
            <option disabled>Year</option>
            {uniqueYears?.map((item, Index) => {
              return (
                <option key={Index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            className="flex items-center justify-center px-2.5 h-7 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
          >
            <option>Month</option>
            {uniqueMonths?.map((item, Index) => {
              return (
                <option key={Index} value={item}>
                  {digitToMonth(item)}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="flex items-center justify-center text-xs font-medium"
          style={{ width: "100%", height: "100%" }} 
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={
                selectedMonth != "Month" ? storeMonthlyData : storeYearlyData
              }
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="peakPower" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
