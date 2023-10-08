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
import ReactLoading from 'react-loading';

export default function DailyView({
  selectedOptionIdInverter,
  selectedOptionIdBuilding,
  selectedOptionIdCompany,
  selectedOptionId,
}) {
  const [ projectForCollectTime, setProjectForCollectTime ] = useState();
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
    if (storeYearMonthDay1.length > 0) {
      const sortedDays = storeYearMonthDay1
        .filter(
          (item) =>
            item.split("-")[0] === selectedYear1 &&
            item.split("-")[1] === selectedMonth1
        )
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
      const filteredData = DailyViewData["data"]?.frameDataArray?.filter((frameItem) => {
        const collectTime = new Date(
          new Date(`2000-01-01T${frameItem.collectTime}`).getTime() +
          6 * 60 * 60 * 1000
        );
        return collectTime.getHours() >= 3 && collectTime.getHours() <= 20;
      });
  
      const formattedData = Array.from({ length: 24 }, (_, hour) => {
        const hourString = hour === 0 ? '12' : (hour > 12 ? (hour - 12).toString() : hour.toString());
        const amPm = hour >= 12 ? 'PM' : 'AM';
        const dataPoint = filteredData.find((frameItem) => {
          const frameHour = new Date(
            `2000-01-01T${frameItem.collectTime}`
          ).getHours();
          return frameHour === hour;
        });
        return {
          MW: dataPoint ? dataPoint.value : 0,
          collectTime: `${hourString}:00 ${amPm}`,
        };
      });
  
      setStoreDailyViewData(formattedData);
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

  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    // Start a timer that calls setLoading1(false) every 2 seconds
    const timer = setInterval(() => {
      if (!DailyViewDataIsLoading) {
        setLoading1(false);
      } else {
        setLoading1(true);
      }
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [DailyViewDataIsLoading]); // Dependency array can be empty if this effect runs only once


  return (
    <>
      <div className="text-md font-bold tracking-wide text-white border border-gray-600 flex items-center justify-center bg-gray-600 rounded-t-lg h-10 space-x-1">
        <span>Daily Generation</span>{loading1 && <ReactLoading type="bubbles" color="white" height={60} />}
      </div>
      <div className="w-full h-96 bg-white p-3 rounded-b-md border border-gray-300 text-center">
      {!loading1 && <>
        <div className="flex items-center justify-center">
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
              {storeYearMonth1.map((item1, index) => {
                if (item1.split("-")[0] === selectedYear1) {
                  return (
                    <option key={index} value={item1.split("-")[1]}>
                      {digitToMonth(item1.split("-")[1])}
                    </option>
                  );
                }
                return null; // Make sure to return null when conditions are not met
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={selectedDay1}
              onChange={(e) => setSelectedDay1(e.target.value)}
            >
              <option disabled>Day</option>
              {storeYearMonthDay1
                .filter(
                  (item1) =>
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
        </div>
        <div className="w-full h-full pb-6 rounded-md relative text-xs font-semibold">
          {/* Add the div element to display Generation and Sun Hours */}
          <div className="flex flex-col justify-between mb-2 absolute top-4 left-14 text-[0.55rem] bg-white p-2 rounded-md space-y-0.5">
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
                <XAxis dataKey="collectTime" ticks={storeDailyViewData.map((dataPoint) => dataPoint.collectTime)} />
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
        </div></>}
      </div>
    </>
  );
}
