import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowDown,
  faPlus,
  faMagnifyingGlass,
  faEye,
  faCopy,
  faIdCard,
  faClipboard,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
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
import { useQuery, useMutation } from "react-query";
import { getInverterHourData } from "@/lib/Helper";
import {
  getProjects,
  searchProject,
  getProject,
  searchCompany,
  getCompany,
  searchBuilding,
  getBuilding,
  searchInverterForBuilding,
  getHistoricalDataForProject,
  getHistoricalDataForCompany,
  getHistoricalDataForBuilding,
  getHistoricalDataForInverter,
  getHistoricalDataForProjectSunHrsBarChartData,
  getHistoricalDataForCompanySunHrsBarChartData,
  getHistoricalDataForBuildingSunHrsBarChartData,
  getHistoricalDataForInverterSunHrsBarChartData,
  getImpactDataForProject,
  getImpactDataForCompany,
  getImpactDataForBuilding,
  getImpactDataForInverter,
  getDailyViewForProject,
  getDailyViewForCompany,
  getDailyViewForBuilding,
  getDailyViewForInverter,
  getCollectTimeForInverterHourlyData,
  getProjectCollectTimeForDailyView,
  getProjectFrameDataForDailyView,
} from "@/lib/Helper";

export default function DailyView({
  dailyViewData,
  collectTimeForInverterHourlyData,
  selectedOptionIdInverter,
  selectedOptionIdBuilding,
  selectedOptionIdCompany,
  selectedOptionId,
  firstProjectForDefaultViewId,
}) {
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [selectedMonth, setSelectedMonth] = useState(undefined);
  const [selectedDay, setSelectedDay] = useState(undefined);
  // console.log(selectedYear, selectedMonth, selectedDay);

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);
  const [uniqueYearsWithoutDuplicates, setUniqueYearsWithoutDuplicates] =
    useState([]);
  const [uniqueMonthsWithoutDuplicates, setUniqueMonthsWithoutDuplicates] =
    useState([]);
  const [uniqueDaysWithoutDuplicates, setUniqueDaysWithoutDuplicates] =
    useState([]);

  const { data: ProjectCollectTimeForDailyViewData, isLoading } = useQuery(
    ["ProjectCollectTimeForDailyView", selectedOptionId],
    () => getProjectCollectTimeForDailyView(selectedOptionId),
    {
      enabled: !!selectedOptionId,
    }
  );

  useEffect(() => {
    if (!isLoading && ProjectCollectTimeForDailyViewData) {
      const tempYears = [];
      const tempMonths = [];
      const tempDays = [];

      ProjectCollectTimeForDailyViewData.forEach((item) => {
        const [year, month, day] = item.split("-");
        tempYears.push(year);
        tempMonths.push(month);
        tempDays.push(month + "-" + day);
      });

      setUniqueYears((prev) => [...prev, ...tempYears]);
      setUniqueMonths((prev) => [...prev, ...tempMonths]);
      setUniqueDays((prev) => [...prev, ...tempDays]);
    }
  }, [ProjectCollectTimeForDailyViewData, isLoading]);

  useEffect(() => {
    setUniqueYearsWithoutDuplicates(removeDuplicatesFromArray(uniqueYears));
    setUniqueMonthsWithoutDuplicates(removeDuplicatesFromArray(uniqueMonths));
    setUniqueDaysWithoutDuplicates(removeDuplicatesFromArray(uniqueDays));
    setSelectedDay(uniqueDaysWithoutDuplicates[0]);
  }, [uniqueYears, uniqueMonths, uniqueDays, uniqueDaysWithoutDuplicates]);

  const [selectedYearMonthDay, setSelectedYearMonthDay] = useState(undefined);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      setSelectedYearMonthDay(
        `${selectedYear}-${selectedMonth}-${selectedDay}`
      );
    }

  }, [selectedYear, selectedMonth, selectedDay]);

  const { data: projectFrameDataForDailyViewData } = useQuery(
    ["ProjectFrameDataForDailyView", selectedOptionId],
    () =>
      getProjectFrameDataForDailyView(selectedOptionId, selectedYearMonthDay),
    {
      enabled: !!selectedYearMonthDay,
    }
  );

  // useEffect(() => {
  //   console.log(
  //     "projectFrameDataForDailyView",
  //     projectFrameDataForDailyViewData
  //   );
  // }, [projectFrameDataForDailyViewData]);

  const [
    dailyViewDataForProjectPowerLineChartDataYearly,
    setDailyViewDataForProjectPowerLineChartDataYearly,
  ] = useState(undefined);
  const [
    dailyViewDataForProjectPowerLineChartDataMonthly,
    setDailyViewDataForProjectPowerLineChartDataMonthly,
  ] = useState(undefined);
  const [
    dailyViewDataForProjectPowerLineChartDataDay,
    setDailyViewDataForProjectPowerLineChartDataDay,
  ] = useState(undefined);

  ///
  const [
    dailyViewDataForProjectPowerLineChartDataYearCount,
    setDailyViewDataForProjectPowerLineChartDataYearCount,
  ] = useState([]);
  const [
    dailyViewDataForProjectPowerLineChartDataMonthCount,
    setDailyViewDataForProjectPowerLineChartDataMonthCount,
  ] = useState([]);
  const [
    dailyViewDataForProjectPowerLineChartDataDayCount,
    setDailyViewDataForProjectPowerLineChartDataDayCount,
  ] = useState([]);
  ////
  const [
    dailyViewDataForProjectPowerLineChartDataYearSelected,
    setDailyViewDataForProjectPowerLineChartDataYearSelected,
  ] = useState();
  const [
    dailyViewDataForProjectPowerLineChartDataMonthSelected,
    setDailyViewDataForProjectPowerLineChartDataMonthSelected,
  ] = useState();
  const [
    dailyViewDataForProjectPowerLineChartDataDaySelected,
    setDailyViewDataForProjectPowerLineChartDataDaySelected,
  ] = useState();
  ///

  useEffect(() => {
    setDailyViewDataForProjectPowerLineChartDataMonthSelected(undefined);
    setDailyViewDataForProjectPowerLineChartDataDaySelected("Day");
  }, [dailyViewDataForProjectPowerLineChartDataYearSelected]);

  useEffect(() => {
    setDailyViewDataForProjectPowerLineChartDataDaySelected("Day");
    setDailyViewDataForProjectPowerLineChartDataDay(undefined);
  }, [dailyViewDataForProjectPowerLineChartDataMonthSelected]);

  useEffect(() => {
    setDailyViewDataForProjectPowerLineChartDataMonthCount([]);
    setDailyViewDataForProjectPowerLineChartDataMonthSelected("Month");
  }, [dailyViewData]);

  useEffect(() => {
    if (!dailyViewDataForProjectPowerLineChartDataYearSelected) {
      setDailyViewDataForProjectPowerLineChartDataYearSelected(
        Object.keys(dailyViewData?.yearly || {}).slice(-1)[0]
      );
    }
  }, [dailyViewDataForProjectPowerLineChartDataYearSelected, dailyViewData]);

  useEffect(() => {
    if (dailyViewData) {
      setDailyViewDataForProjectPowerLineChartDataYearCount(
        Object.keys(dailyViewData?.yearly || {})
      );
      setDailyViewDataForProjectPowerLineChartDataYearly(
        dailyViewData?.yearly[
          dailyViewDataForProjectPowerLineChartDataYearSelected
        ]?.map((item) => {
          return {
            name: item?.month,
            generation: item?.generation,
          };
        })
      );
    }
  }, [dailyViewDataForProjectPowerLineChartDataYearSelected, dailyViewData]);

  useEffect(() => {
    if (
      dailyViewData &&
      dailyViewDataForProjectPowerLineChartDataYearSelected
    ) {
      setDailyViewDataForProjectPowerLineChartDataMonthCount(
        Object.keys(dailyViewData?.monthly || {})
      );
      setDailyViewDataForProjectPowerLineChartDataMonthly(
        dailyViewData?.monthly[
          dailyViewDataForProjectPowerLineChartDataMonthSelected
        ]?.map((item) => {
          return {
            name: item?.day,
            generation: item?.generation,
          };
        })
      );
    }
  }, [
    dailyViewDataForProjectPowerLineChartDataYearSelected,
    dailyViewData,
    dailyViewDataForProjectPowerLineChartDataMonthSelected,
  ]);

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

  const [inverterHourData, setInverterHourData] = useState([]);
  useQuery(
    [
      "getInverterHourData",
      dailyViewDataForProjectPowerLineChartDataDaySelected,
    ],
    async () => {
      const result = await getInverterHourData({
        selectedOptionIdInverter,
        dailyViewDataForProjectPowerLineChartDataDaySelected,
      });
      return result;
    },
    {
      onSuccess: (data) => {
        setInverterHourData(data);
      },
    }
  );

  useEffect(() => {
    if (
      inverterHourData &&
      dailyViewDataForProjectPowerLineChartDataYearSelected &&
      dailyViewDataForProjectPowerLineChartDataMonthSelected !== "Month" &&
      dailyViewDataForProjectPowerLineChartDataDaySelected !== "Day"
    ) {
      setDailyViewDataForProjectPowerLineChartDataDay(
        inverterHourData?.map((item) => {
          return {
            value: item?.value,
            collectTime: item?.collectTime,
          };
        })
      );
    }
  }, [
    dailyViewDataForProjectPowerLineChartDataYearSelected,
    inverterHourData,
    dailyViewDataForProjectPowerLineChartDataMonthSelected,
    dailyViewDataForProjectPowerLineChartDataDaySelected,
  ]);

  // console.log("dailyViewDataForProjectPowerLineChartDataDay", dailyViewDataForProjectPowerLineChartDataDay);

  const [
    dailyViewDataForProjectPowerLineChartDataStore,
    setDailyViewDataForProjectPowerLineChartDataStore,
  ] = useState([]);

  useEffect(() => {
    if (
      dailyViewDataForProjectPowerLineChartDataYearly &&
      !dailyViewDataForProjectPowerLineChartDataMonthly &&
      !dailyViewDataForProjectPowerLineChartDataDay
    ) {
      setDailyViewDataForProjectPowerLineChartDataStore(
        dailyViewDataForProjectPowerLineChartDataYearly
      );
    } else if (
      dailyViewDataForProjectPowerLineChartDataYearly &&
      dailyViewDataForProjectPowerLineChartDataMonthly &&
      !dailyViewDataForProjectPowerLineChartDataDay
    ) {
      setDailyViewDataForProjectPowerLineChartDataStore(
        dailyViewDataForProjectPowerLineChartDataMonthly
      );
    } else if (
      dailyViewDataForProjectPowerLineChartDataYearly &&
      dailyViewDataForProjectPowerLineChartDataMonthly &&
      dailyViewDataForProjectPowerLineChartDataDay
    ) {
      setDailyViewDataForProjectPowerLineChartDataStore(
        dailyViewDataForProjectPowerLineChartDataDay
      );
    }
  }, [
    dailyViewDataForProjectPowerLineChartDataDay,
    dailyViewDataForProjectPowerLineChartDataMonthly,
    dailyViewDataForProjectPowerLineChartDataYearly,
    dailyViewDataForProjectPowerLineChartDataDaySelected,
    dailyViewDataForProjectPowerLineChartDataMonthSelected,
  ]);

  // console.log(
  //   dailyViewDataForProjectPowerLineChartDataDaySelected,
  //   dailyViewDataForProjectPowerLineChartDataDay
  // );

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  // console.log(
  //   dailyViewData?.monthly,
  //   dailyViewDataForProjectPowerLineChartDataMonthSelected,
  //   "hhh"
  // );

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
              // value={dailyViewDataForProjectPowerLineChartDataYearSelected}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option disabled>Year</option>

              {uniqueYearsWithoutDuplicates?.map((item, Index) => {
                return (
                  <option key={Index} value={item} selected={Index === 0}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              // value={dailyViewDataForProjectPowerLineChartDataMonthSelected}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option disabled>Month</option>
              {uniqueMonthsWithoutDuplicates?.map((item, Index) => {
                return (
                  <option key={Index} value={item} selected={Index === 0}>
                    {digitToMonth(item)}
                  </option>
                );
              })}
            </select>
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              // value={dailyViewDataForProjectPowerLineChartDataMonthSelected}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option disabled>Day</option>
              {uniqueDaysWithoutDuplicates?.map((item, index) => {
                if (item.split("-")[0] === uniqueDaysWithoutDuplicates?.[0].split("-")[0]) {
                  return (
                    <option key={index} value={item} selected={index === 0}>
                      {item.split("-")[1]}
                    </option>
                  );
                }
                return null; // Add this line to handle the case when the condition is not met
              })}
            </select>
            {collectTimeForInverterHourlyData?.length > 0 &&
              selectedOptionIdInverter && (
                <select
                  disabled={
                    dailyViewDataForProjectPowerLineChartDataMonthSelected ===
                    "Month"
                      ? true
                      : false
                  }
                  className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
                  value={dailyViewDataForProjectPowerLineChartDataDaySelected}
                  onChange={(e) =>
                    setDailyViewDataForProjectPowerLineChartDataDaySelected(
                      e.target.value
                    )
                  }
                >
                  <option disabled selected>
                    Day
                  </option>
                  {collectTimeForInverterHourlyData?.map((item, Index) => {
                    if (
                      dailyViewDataForProjectPowerLineChartDataYearSelected ===
                        item?.split("-")[0] &&
                      parseInt(item?.split("-")[1], 10) ===
                        parseInt(
                          dailyViewDataForProjectPowerLineChartDataMonthSelected.split(
                            "-"
                          )[1],
                          10
                        )
                    ) {
                      return (
                        <option key={Index} value={item}>
                          {item?.split("-")[2]}
                        </option>
                      );
                    }
                  })}
                </select>
              )}
          </div>
          <div className="flex space-x-4">
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={dailyViewDataForProjectPowerLineChartDataYearSelected}
              onChange={(e) =>
                setDailyViewDataForProjectPowerLineChartDataYearSelected(
                  e.target.value
                )
              }
            >
              <option disabled>Year</option>
              {dailyViewDataForProjectPowerLineChartDataYearCount?.map(
                (item, Index) => {
                  return (
                    <option key={Index} value={item}>
                      {item}
                    </option>
                  );
                }
              )}
            </select>
            <select
              className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
              value={dailyViewDataForProjectPowerLineChartDataMonthSelected}
              onChange={(e) =>
                setDailyViewDataForProjectPowerLineChartDataMonthSelected(
                  e.target.value
                )
              }
            >
              <option disabled selected>
                Month
              </option>
              {dailyViewDataForProjectPowerLineChartDataMonthCount?.map(
                (item, Index) => {
                  if (
                    dailyViewDataForProjectPowerLineChartDataYearSelected ===
                    item?.split("-")[0]
                  ) {
                    return (
                      <option key={Index} value={item}>
                        {digitToMonth(item?.split("-")[1])}
                      </option>
                    );
                  }
                }
              )}
            </select>
            {collectTimeForInverterHourlyData?.length > 0 &&
              selectedOptionIdInverter && (
                <select
                  disabled={
                    dailyViewDataForProjectPowerLineChartDataMonthSelected ===
                    "Month"
                      ? true
                      : false
                  }
                  className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
                  value={dailyViewDataForProjectPowerLineChartDataDaySelected}
                  onChange={(e) =>
                    setDailyViewDataForProjectPowerLineChartDataDaySelected(
                      e.target.value
                    )
                  }
                >
                  <option disabled selected>
                    Day
                  </option>
                  {collectTimeForInverterHourlyData?.map((item, Index) => {
                    if (
                      dailyViewDataForProjectPowerLineChartDataYearSelected ===
                        item?.split("-")[0] &&
                      parseInt(item?.split("-")[1], 10) ===
                        parseInt(
                          dailyViewDataForProjectPowerLineChartDataMonthSelected.split(
                            "-"
                          )[1],
                          10
                        )
                    ) {
                      return (
                        <option key={Index} value={item}>
                          {item?.split("-")[2]}
                        </option>
                      );
                    }
                  })}
                </select>
              )}
          </div>
        </div>
        <div className="flex w-full h-72 items-center justify-center">
          {/* <div
            className="flex justify-center items-center"
            style={{ width: "30%", height: "80%" }}
          >
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3 select-none">
                <span className="text-sm font-semibold text-white">
                  Generation, KWh
                </span>
                <span className="text-sm font-semibold text-white">{dailyViewDataForProjectPowerLineChartDataMonthly ? dailyViewDataForProjectPowerLineChartDataMonthly?.reduce((a, b) => a + b?.generation, 0).toFixed(1) : dailyViewDataForProjectPowerLineChartDataYearly?.reduce((a, b) => a + b?.generation, 0).toFixed(1)}</span>
              </div>
            </div>
          </div> */}
          <div style={{ width: "90%", height: "90%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={dailyViewDataForProjectPowerLineChartDataStore}
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
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={
                    dailyViewDataForProjectPowerLineChartDataDay
                      ? "value"
                      : "generation"
                  }
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
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center bg-[#8884d8] rounded-md px-3 py-2 select-none space-x-1">
            <span className="text-sm font-semibold text-white">
              Generation, kWh
            </span>
            <span className="text-sm font-semibold text-white">-</span>
            <span className="text-sm font-semibold text-white">
              {dailyViewDataForProjectPowerLineChartDataMonthly
                ? dailyViewDataForProjectPowerLineChartDataMonthly
                    ?.reduce((a, b) => a + b?.generation, 0)
                    .toFixed(1)
                : dailyViewDataForProjectPowerLineChartDataYearly
                    ?.reduce((a, b) => a + b?.generation, 0)
                    .toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
