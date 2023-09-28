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
import { getDailyViewCollectTime, getHistoricalSunHours } from "@/lib/Helper";
import ReactLoading from "react-loading";

export default function HistoricalPeakPower({
  handlePeakPowerOpen,
  handleSunHoursOpen,
  peakPowerOpen,
  sunHoursOpen,
  selectedOptionId,
  selectedOptionIdCompany,
  selectedOptionIdBuilding,
  selectedOptionIdInverter,
}) {
  const [projectForCollectTime, setProjectForCollectTime] = useState();
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
      setProjectForCollectTime(selectedOptionId);
    }
    else if (
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
    ["DailyViewCollectTime", projectForCollectTime],
    () => getDailyViewCollectTime(projectForCollectTime),
    {
      enabled: !!projectForCollectTime,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

  const [yearsFromData, setYearsFromData] = useState([]);
  const [monthsFromData, setMonthsFromData] = useState([]);
  const [daysFromData, setDaysFromData] = useState([]);
  const [uniqueYears, setuniqueYears] = useState([]);
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
        ...DailyViewCollectTimeData?.map(
          (item) => item.split("-")[0] + "-" + item.split("-")[1]
        )
      );
      storeYearMonthDay.push(
        ...DailyViewCollectTimeData?.map(
          (item) =>
            item.split("-")[0] +
            "-" +
            item.split("-")[1] +
            "-" +
            item.split("-")[2]
        )
      );

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
    setuniqueYears(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths1(removeDuplicatesMonthsFromArray(monthsFromData));
    // setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  useEffect(() => {
    if (uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0]); // Remove the dot before [0]
    }
  }, [uniqueYears]);

  useEffect(() => {
    if (uniqueMonths1.length > 0) {
      setSelectedMonth(uniqueMonths1[0]);
    }
  }, [uniqueMonths1]);

  useEffect(() => {
    if (storeYearMonthDay1.length > 0) {
      const sortedDays = storeYearMonthDay1
        .filter(
          (item) =>
            item.split("-")[0] === selectedYear &&
            item.split("-")[1] === selectedMonth
        )
        .map((item) => item.split("-")[2])
        .sort((a, b) => a.localeCompare(b));
      const lastIdx = sortedDays.length - 1;
      setSelectedDay1(sortedDays[lastIdx]);
    }
  }, [selectedMonth, storeYearMonthDay1, selectedYear]);

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
    () => getHistoricalSunHours({ collectionKey, dateKey }),
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
        historicalPeakPowerData
          ?.map((item) => {
            // If collectTime has 3 parts, it's not a monthly data point
            if (item.collectTime.split("-").length === 3) {
              return {
                name: parseInt(item.collectTime.split("-")[2]),
                sunHours: item.sunHours,
              };
            }

            // Create an object with the name (converted month) and peakPower
            return {
              name: digitToMonth(item.collectTime.split("-")[1]),
              sunHours: item.sunHours,
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
  //         if (year === selectedYear&& month === selectedMonth) {
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
    }, 1000);
  }, []);

  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    // Start a timer that calls setLoading1(false) every 2 seconds
    const timer = setInterval(() => {
      if (!historicalPeakPowerDataIsLoading) {
        setLoading1(false);
      } else {
        setLoading1(true);
      }
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [historicalPeakPowerDataIsLoading]);

  return (
    <>
      <div className="text-md font-bold tracking-wide text-white border border-gray-600 flex items-center justify-center bg-gray-600 rounded-t-lg h-10 text-center space-x-1">
        <span>Historical Peak Power / Sun-Hrs</span>{" "}
        {loading1 && <ReactLoading type="bubbles" color="white" height={60} />}
      </div>
      <div className="flex flex-col col-span-5 w-full h-96 bg-white p-3 rounded-b-md border border-gray-300 text-center">
        {!loading1 && (
          <>
            <div className="flex items-center justify-center">
              <div className="flex justify-end items-center space-x-5">
                <div className="flex rounded-md bg-gray-200">
                  <button
                    className={`flex items-center justify-center h-6 px-2 text-xs sm:text-sm font-semibold rounded-l-md select-none border border-[#39B54A] ${
                      peakPowerOpen
                        ? "bg-[#39B54A] text-white"
                        : "bg-white text-[#39B54A]"
                    }`}
                    onClick={() => handlePeakPowerOpen()}
                  >
                    Peak Power
                  </button>
                  <button
                    className={`flex items-center justify-center h-6 px-2 text-xs sm:text-sm font-semibold rounded-r-md select-none border border-[#39B54A] ${
                      sunHoursOpen
                        ? "bg-[#39B54A] text-white"
                        : "bg-white text-[#39B54A]"
                    }`}
                    onClick={() => handleSunHoursOpen()}
                  >
                    Sun Hours
                  </button>
                </div>
                <select
                  className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
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
                  className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                  }}
                >
                  <option>Month</option>
                  {storeYearMonth1.map((item1, index) => {
                    if (item1.split("-")[0] === selectedYear) {
                      return (
                        <option key={index} value={item1.split("-")[1]}>
                          {digitToMonth(item1.split("-")[1])}
                        </option>
                      );
                    }
                    return null; // Make sure to return null when conditions are not met
                  })}
                </select>
              </div>
            </div>
            <div
              className="flex items-center justify-center text-xs font-semibold"
              style={{ width: "100%", height: "100%" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={storeHistoricalPeakPowerData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 6]}
                    tickFormatter={(value) => `${value} KW`}
                  />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="sunHours" fill="#82ca9d" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </>
  );
}
