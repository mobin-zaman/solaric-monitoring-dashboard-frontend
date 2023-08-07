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
import {
  getDailyViewCollectTime,
  getHistoricalPeakPowerData,
} from "@/lib/Helper";
import ReactLoading from 'react-loading';

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
      // if (localStorage.getItem("historicalPeakPowerDate")) {
      //   const date = localStorage.getItem("historicalPeakPowerDate").split("-");
      //   setSelectedYear(date[0]);
      // } else {
      //   const sortedYears = uniqueYears.sort(); // Sort the uniqueYears1 array
      //   const lastIdx = sortedYears.length - 1;
      //   setSelectedYear(sortedYears[lastIdx]);
      // }
      const sortedYears = uniqueYears.sort(); // Sort the uniqueYears1 array
      const lastIdx = sortedYears.length - 1;
      setSelectedYear(sortedYears[lastIdx]);
    }
  }, [uniqueYears]);

  // useEffect(() => {
  //   if (selectedMonth != "Month" && localStorage.getItem("historicalPeakPowerDate")) {
  //     const date = localStorage.getItem("historicalPeakPowerDate").split("-");
  //     setSelectedMonth(date[1]);
  //   }
  // }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonth("Month");
  }, [selectedYear]);

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
    isLoading: historicalPeakPowerDataIsLoading,
    error: historicalPeakPowerDataError,
  } = useQuery(
    ["historicalPeakPowerData", collectionKey, dateKey],
    () => getHistoricalPeakPowerData({ collectionKey, dateKey }),
    {
      enabled: !!collectionKey && !!dateKey,
      onSuccess: (data) => {
        console.log("historicalPeakPowerDataaaaaaaaaaaaaaaaaaaaaaa", data);
      },
    }
  );

  const [storeHistoricalPeakPowerData, setStoreHistoricalPeakPowerData] =
    useState([]);

  useEffect(() => {
    if (!historicalPeakPowerDataIsLoading && historicalPeakPowerData) {
      setStoreHistoricalPeakPowerData(
        historicalPeakPowerData?.map((item) => {


          // If collectTime has 3 parts, it's not a monthly data point
          if (item.collectTime.split("-").length === 3) {
            return {
              name: parseInt(item.collectTime.split("-")[2]),
              peakPower: item.peakPower,
            };
          }

          // Create an object with the name (converted month) and peakPower
          return {
            name: digitToMonth(item.collectTime.split("-")[1]),
            peakPower: item.peakPower,
          };
        })
          .sort((a, b) => {
            const monthA = a.name;
            const monthB = b.name;

            // Define the order of the months
            const monthOrder = {
              Jan: 1,
              Feb: 2,
              Mar: 3,
              Apr: 4,
              May: 5,
              Jun: 6,
              Jul: 7,
              Aug: 8,
              Sep: 9,
              Oct: 10,
              Nov: 11,
              Dec: 12,
            };

            if (!isNaN(monthA) && !isNaN(monthB)) {
              return monthA - monthB;
            } else {
              return monthOrder[monthA] - monthOrder[monthB];
            }
          })
      );
    }
  }, [historicalPeakPowerData, historicalPeakPowerDataIsLoading]);

  useEffect(() => {
    localStorage.setItem("historicalPeakPowerDate", dateKey);
  }, [dateKey]);

  // useEffect(() => {
  //   if (historicalPeakPowerData) {
  //     const monthlyData = Object.keys(historicalPeakPowerData)
  //       .map((item) => {
  //         const [year, month] = item.split("-");
  //         if (year === selectedYear && month === selectedMonth) {
  //           return historicalPeakPowerData[item]?.dayWisePeakPower?.map(
  //             (dayItem) => ({
  //               name: dayItem.day.split("-")[2],
  //               peakPower: dayItem.peakPower,
  //             })
  //           );
  //         }
  //         return null; // Return null for months that don't match the selected month
  //       })
  //       .filter(Boolean); // Filter out null values

  //     setStoreMonthlyData(monthlyData.flat());
  //   }
  // }, [historicalPeakPowerData, selectedYear, selectedMonth]);

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

  const [fakeLoader, setFakeLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoader(true);
    }, 500);

  }, []);

  return (
    <>
      <div className="flex flex-col col-span-5 h-[20rem] space-y-3">
        <div className="flex space-x-3 justify-end">
          <select
            className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
          >
            <option disabled>Year</option>
            {uniqueYears?.sort().map((item, Index) => {
              return (
                <option key={Index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
          >
            <option>Month</option>
            {uniqueMonths?.sort().map((item, index) => {
              return (
                <option key={index} value={item}>
                  {digitToMonth(item)}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="flex items-center justify-center text-xs font-semibold"
          style={{ width: "100%", height: "100%" }}
        >
          {fakeLoader ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={storeHistoricalPeakPowerData}
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
                <Bar dataKey="peakPower" fill="#82ca9d" barSize={30} />
              </BarChart>
            </ResponsiveContainer>) : (
            <div width="100%" height="100%" className="flex items-center justify-center border w-full h-full">
              <ReactLoading type="spokes" color="#25476A" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
