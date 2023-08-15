import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDailyViewCollectTime, getDailyViewData } from "@/lib/Helper";

export default function DailyView({
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
    // setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  useEffect(() => {
    if (uniqueYears1.length > 0) {
      if (localStorage.getItem("date")) {
        const date = localStorage.getItem("date").split("-");
        setSelectedYear1(date[0]);
      } else {
        const sortedYears = uniqueYears1.sort(); // Sort the uniqueYears1 array
        const lastIdx = sortedYears.length - 1;
        setSelectedYear1(sortedYears[lastIdx]);
      }
    }
  }, [uniqueYears1]);

  useEffect(() => {
    if (uniqueMonths1.length > 0) {
      if (localStorage.getItem("date")) {
        const date = localStorage.getItem("date").split("-");
        setSelectedMonth1(date[1]);
      } else {
        const sortedMonths = uniqueMonths1.sort(); // Sort the uniqueMonths1 array
        const lastIdx = sortedMonths.length - 1;
        setSelectedMonth1(sortedMonths[lastIdx]);
      }
    }
  }, [uniqueMonths1]);

  useEffect(() => {
    if (monthsFromData.length > 0) {
      if (localStorage.getItem("date")) {
        const date = localStorage.getItem("date").split("-");
        setSelectedDay1(date[2]);
      } else {
        const sortedDays = monthsFromData
          .filter((item) => item.split("-")[0] === selectedMonth1)
          .map((item) => item.split("-")[1])
          .sort((a, b) => a.localeCompare(b));

        const lastIdx = sortedDays.length - 1;
        setSelectedDay1(sortedDays[lastIdx]);
      }
    }
  }, [selectedMonth1, monthsFromData]);

  const [dateKey, setDateKey] = useState("");

  useEffect(() => {
    if (selectedYear1 && selectedMonth1 && selectedDay1) {
      setDateKey(`${selectedYear1}-${selectedMonth1}-${selectedDay1}`);
    }
  }, [selectedYear1, selectedMonth1, selectedDay1]);

  const {
    data: DailyViewData,
    isLoading: DailyViewDataIsLoading,
    error: DailyViewDataError,
  } = useQuery(
    ["DailyViewData", collectionKey, dateKey],
    () => getDailyViewData({ collectionKey, dateKey }),
    {
      enabled: !!collectionKey && !!dateKey,
      onSuccess: (data) => {
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
      },
    }
  );

  const [storeDailyViewData, setStoreDailyViewData] = useState([]);
  const [generationData, setGenerationData] = useState();
  const [sunHoursData, setSunHoursData] = useState();

  useEffect(() => {
    if (!DailyViewDataIsLoading && DailyViewData) {
      setStoreDailyViewData(
        DailyViewData["data"]?.frameDataArray?.map((frameItem) => ({
          MW: frameItem.value,
          collectTime: new Date(
            new Date(`2000-01-01T${frameItem.collectTime}`).getTime() +
              6 * 60 * 60 * 1000
            // + 50 * 60 * 1000
          ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        }))
      );
      setGenerationData(DailyViewData["data"]?.generation?.toFixed(2));
      setSunHoursData(DailyViewData["data"]?.sunHrs?.toFixed(2));
    }
  }, [DailyViewData, DailyViewDataIsLoading]);

  useEffect(() => {
    console.log("storeDailyViewData", storeDailyViewData);
  }, [storeDailyViewData]);

  useEffect(() => {
    localStorage.setItem("date", dateKey);
  }, [dateKey]);

  useEffect(() => {
    // const sortedYears = uniqueYears1.sort(); // Sort the uniqueYears1 array
    // setSelectedYear1(sortedYears[0]);
    // const sortedMonths = uniqueMonths1.sort(); // Sort the uniqueMonths1 array
    // setSelectedMonth1(sortedMonths[0]);
    // const sortedDays = monthsFromData
    //   ?.map((item, Index) => {
    //     if (item.split("-")[0] === sortedMonths[0]) {
    //       return item.split("-")[1];
    //     }
    //   })
    //   .sort();
    //   setSelectedDay1(sortedDays[0]);
  }, [selectedOptionId, uniqueYears1, uniqueMonths1, monthsFromData]);

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Extract the necessary data from the payload
      const { collectTime, MW } = payload[0].payload;

      // Custom tooltip content
      return (
        <div className="custom-tooltip bg-white px-5 py-3 text-sm rounded-md border-2 border-gray-300 space-y-0.5">
          <p>{`Time: ${collectTime}`}</p>
          <p>{`${Math.round(MW)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KW`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-md font-semibold tracking-wide text-[#25476A]">
            Daily Generation
          </div>
          {/* <FontAwesomeIcon icon={faRotate} /> */}
          <div className="flex space-x-4">
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedYear1}
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
              value={selectedDay1}
              onChange={(e) => setSelectedDay1(e.target.value)}
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
        </div>
        <div className="w-full h-full pb-6 rounded-md relative text-xs font-semibold">
          {/* Add the div element to display Generation and Sun Hours */}
          <div className="flex flex-col justify-between mb-2 absolute top-8 left-20 bg-white p-2 rounded-md space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="">Generation:</span>
              <span className="">
                {(Math.round(generationData * 100) / 100)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                MWH
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="">Sun Hours:</span>
              <span className="">{sunHoursData} Hrs.</span>
            </div>
          </div>
          <div
            style={{ width: "100%", height: "100%" }}
            className="text-xs font-semibold"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={storeDailyViewData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="collectTime" />
                <YAxis tickFormatter={(value) => `${value} kw`} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={"MW"}
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                {/* <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center justify-center bg-[#8884d8] rounded-md px-3 py-2 select-none space-x-1">
            <span className="text-sm font-semibold text-white">
              Generation :
            </span>
            <span className="text-sm font-semibold text-white">
              {generationData}
            </span>
            <span className="text-sm font-semibold text-white">MWh</span>
          </div>
          <div className="flex items-center justify-center bg-[#8884d8] rounded-md px-3 py-2 select-none space-x-1">
            <span className="text-sm font-semibold text-white">
              Sun Hours :
            </span>
            <span className="text-sm font-semibold text-white">
              {sunHoursData}
            </span>
            <span className="text-sm font-semibold text-white">H</span>
          </div>
        </div> */}
      </div>
    </>
  );
}
