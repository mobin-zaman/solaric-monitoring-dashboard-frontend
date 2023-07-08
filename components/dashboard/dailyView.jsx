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

  useEffect(() => {
    if (uniqueYears1.length > 0) {
      setSelectedYear1(uniqueYears1[0]);
    }
  }, [uniqueYears1]);

  useEffect(() => {
    if (uniqueMonths1.length > 0) {
      setSelectedMonth1(uniqueMonths1[0]);
    }
  }, [uniqueMonths1]);

  useEffect(() => {
    if (uniqueDays1.length > 0) {
      setSelectedDay1(uniqueDays1[0]);
    }
  }, [uniqueDays1]);

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
              5 * 60 * 60 * 1000
          ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        }))
      );
      setGenerationData(DailyViewData["data"]?.generation.toFixed(1));
      setSunHoursData(DailyViewData["data"]?.sunHrs.toFixed(1));
    }
  }, [DailyViewData, DailyViewDataIsLoading]);

  useEffect(() => {
    console.log("storeDailyViewData", storeDailyViewData);
  }, [storeDailyViewData]);

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
          <p>{`${MW.toFixed(1)} kw`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setSelectedDay1(
      monthsFromData
        .filter(item => item.split("-")[0] === selectedMonth1)
        .map(item => item.split("-")[1])
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 1)
    );
  }, [selectedMonth1, monthsFromData]);

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Daily View
          </span>
          {/* <FontAwesomeIcon icon={faRotate} /> */}
          <div className="flex space-x-4">
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
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
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedMonth1}
              onChange={(e) => setSelectedMonth1(e.target.value)}
            >
              <option disabled>Month</option>
              {uniqueMonths1?.map((item, Index) => {
                return (
                  <option key={Index} value={item}>
                    {digitToMonth(item)}
                  </option>
                );
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
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
        <div className="flex w-full h-72 items-center justify-center">
          <div
            style={{ width: "90%", height: "90%" }}
            className="text-xs font-medium"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={storeDailyViewData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center justify-center bg-[#8884d8] rounded-md px-3 py-2 select-none space-x-1">
            <span className="text-sm font-semibold text-white">
              Generation :
            </span>
            <span className="text-sm font-semibold text-white">
              {generationData}
            </span>
            <span className="text-sm font-semibold text-white">MW</span>
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
        </div>
      </div>
    </>
  );
}
