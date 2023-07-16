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
import { getHistoricalPeakPowerData } from "@/lib/Helper";

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
    data: historicalPeakPowerData,
    isLoading,
    error,
  } = useQuery(
    ["historicalPeakPowerData", collectionKey],
    () => getHistoricalPeakPowerData(collectionKey),
    {
      enabled: !!collectionKey,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

  const [yearsFromData, setYearsFromData] = useState([]);
  const [monthsFromData, setMonthsFromData] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);

  useEffect(() => {
    if (!isLoading && historicalPeakPowerData) {
      const tempYears = [];
      const tempMonths = [];

      Object.keys(historicalPeakPowerData)?.map((item) => {
        const [year, month] = item.split("-");
        tempYears.push(year);
        tempMonths.push(month);
      });

      setYearsFromData(tempYears);
      setMonthsFromData(tempMonths);
    }
  }, [isLoading, historicalPeakPowerData]);

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    setUniqueYears(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths(removeDuplicatesFromArray(monthsFromData));
  }, [yearsFromData, monthsFromData]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [storeYearlyData, setStoreYearlyData] = useState([]);
  const [storeMonthlyData, setStoreMonthlyData] = useState([]);

  useEffect(() => {
    if (uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0]);
      setStoreYearlyData(
        Object.keys(historicalPeakPowerData)?.map((item, index) => {
          const [year, month] = item.split("-");
          if (year === selectedYear) {
            const peakPower = historicalPeakPowerData[item]?.peakPower;
            const peakPowerType = index % 2 === 0 ? "PeakPowerA" : "PeakPowerB";
            return {
              name: digitToMonth(month),
              peakPower: peakPower,
            };
          }
        })
      );
    }
  }, [uniqueYears, historicalPeakPowerData, selectedYear]);

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
