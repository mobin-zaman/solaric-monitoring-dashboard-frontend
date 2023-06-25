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
import { use, useEffect, useState } from "react";
import HistoricalPeakPower from "./historicalPeakPower";

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

export default function Historical({
  historicalDataForProject,
  historicalDataForProjectSunHrsBarChartData,
  firstProjectForDefaultViewId,
  selectedOptionId,
  selectedOptionIdCompany,
  selectedOptionIdBuilding,
  selectedOptionIdInverter,
}) {
  const [
    historicalDataForProjectSunHrsBarChartDataYearly,
    setHistoricalDataForProjectSunHrsBarChartDataYearly,
  ] = useState([]);
  const [
    historicalDataForProjectSunHrsBarChartDataMonthly,
    setHistoricalDataForProjectSunHrsBarChartDataMonthly,
  ] = useState([]);
  const [
    historicalDataForProjectSunHrsBarChartDataYearCount,
    setHistoricalDataForProjectSunHrsBarChartDataYearCount,
  ] = useState([]);
  const [
    historicalDataForProjectSunHrsBarChartDataMonthCount,
    setHistoricalDataForProjectSunHrsBarChartDataMonthCount,
  ] = useState([]);
  const [
    historicalDataForProjectSunHrsBarChartDataYearSelected,
    setHistoricalDataForProjectSunHrsBarChartDataSelected,
  ] = useState("Year");
  const [
    historicalDataForProjectSunHrsBarChartDataMonthSelected,
    setHistoricalDataForProjectSunHrsBarChartDataMonthSelected,
  ] = useState("Month");

  useEffect(() => {
    setHistoricalDataForProjectSunHrsBarChartDataSelected("Year");
    setHistoricalDataForProjectSunHrsBarChartDataMonthSelected("Month");
    if (historicalDataForProjectSunHrsBarChartData) {
      setHistoricalDataForProjectSunHrsBarChartDataSelected(
        Object.keys(
          historicalDataForProjectSunHrsBarChartData?.yearly || {}
        ).slice(-1)[0]
      );
    }
  }, [historicalDataForProjectSunHrsBarChartData]);

  useEffect(() => {
    if (historicalDataForProjectSunHrsBarChartData) {
      setHistoricalDataForProjectSunHrsBarChartDataSelected(
        Object.keys(
          historicalDataForProjectSunHrsBarChartData?.yearly || {}
        ).slice(-1)[0]
      );
      setHistoricalDataForProjectSunHrsBarChartDataYearCount(
        Object.keys(historicalDataForProjectSunHrsBarChartData?.yearly || {})
      );
      // setHistoricalDataForProjectSunHrsBarChartDataMonthCount(Object.keys(historicalDataForProjectSunHrsBarChartData?.monthly || {}));
      setHistoricalDataForProjectSunHrsBarChartDataYearly(
        historicalDataForProjectSunHrsBarChartData?.yearly?.["2023"]?.map(
          (item) => {
            return {
              name: item?.month,
              sunHours: item?.sunHours,
            };
          }
        )
      );
    }
  }, [
    historicalDataForProjectSunHrsBarChartData,
    historicalDataForProjectSunHrsBarChartDataMonthSelected,
  ]);

  useEffect(() => {
    if (
      historicalDataForProjectSunHrsBarChartData &&
      historicalDataForProjectSunHrsBarChartDataYearSelected &&
      historicalDataForProjectSunHrsBarChartDataMonthSelected
    ) {
      setHistoricalDataForProjectSunHrsBarChartDataMonthCount(
        Object.keys(historicalDataForProjectSunHrsBarChartData?.monthly || {})
      );
      setHistoricalDataForProjectSunHrsBarChartDataMonthly(
        historicalDataForProjectSunHrsBarChartData?.monthly?.[
          historicalDataForProjectSunHrsBarChartDataMonthSelected
        ]?.map((item) => {
          return {
            name: item?.day,
            sunHours: item?.sunHours,
          };
        })
      );
    }
  }, [
    historicalDataForProjectSunHrsBarChartDataYearSelected,
    historicalDataForProjectSunHrsBarChartDataMonthSelected,
    historicalDataForProjectSunHrsBarChartData,
  ]);

  console.log(historicalDataForProjectSunHrsBarChartDataMonthSelected);

  const digitToMonth = (digit) => {
    switch (digit) {
      case "1":
        return "Jan";
      case "2":
        return "Feb";
      case "3":
        return "Mar";
      case "4":
        return "Apr";
      case "5":
        return "May";
      case "6":
        return "Jun";
      case "7":
        return "Jul";
      case "8":
        return "Aug";
      case "9":
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

  const [peakPowerOpen, setPeakPowerOpen] = useState(false);
  const [sunHoursOpen, setSunHoursOpen] = useState(true);

  const handlePeakPowerOpen = () => {
    setPeakPowerOpen(true);
    setSunHoursOpen(false);
  };

  const handleSunHoursOpen = () => {
    setPeakPowerOpen(false);
    setSunHoursOpen(true);
  };

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Historical
          </span>
          <div className="flex">
          <div
            className="flex justify-end items-center space-x-5"
          >
            <div className="flex rounded-md bg-gray-200">
              <button
                className={`flex items-center justify-center h-8 p-2 text-sm font-semibold rounded-l-md select-none border border-[#39B54A] ${ peakPowerOpen ? "bg-[#39B54A] text-white" : "bg-white text-[#39B54A]" }`}
                onClick={() => handlePeakPowerOpen()}
              >
                Peak Power
              </button>
              <button
                className={`flex items-center justify-center h-8 p-2 text-sm font-semibold rounded-r-md select-none border border-[#39B54A] ${ sunHoursOpen ? "bg-[#39B54A] text-white" : "bg-white text-[#39B54A]" }`}
                onClick={() => handleSunHoursOpen()}
              >
                Sun Hours
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="flex justify-center items-start col-span-3">
            <table className="table-fixed w-full border rounded-md select-none text-[#25476A]">
              <tbody className="text-center">
                <tr className="bg-gray-200 h-16 font-semibold">
                  <td></td>
                  <td>Prod</td>
                  <td>Export</td>
                  <td>Sun-Hrs</td>
                </tr>
                <tr className="h-12">
                  <td>Today</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.production?.totalGenerationToday.toFixed(
                      1
                    ) || 0}
                  </td>
                  <td>...</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.sunHrs?.sunHoursThisMonth?.toFixed(
                      1
                    ) || 0}
                  </td>
                </tr>
                <tr className="h-12">
                  <td>This Month</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.production?.totalGenerationThisMonth.toFixed(
                      1
                    ) || 0}
                  </td>
                  <td>...</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.sunHrs?.sunHoursThisYear?.toFixed(
                      1
                    ) || 0}
                  </td>
                </tr>
                <tr className="h-12">
                  <td>This Year</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.production?.totalGenerationThisYear.toFixed(
                      1
                    ) || 0}
                  </td>
                  <td>...</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.sunHrs?.sunHoursTillToday?.toFixed(
                      1
                    ) || 0}
                  </td>
                </tr>
                <tr className="h-12">
                  <td>All Time</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.production?.totalGenerationAllTime.toFixed(
                      1
                    ) || 0}
                  </td>
                  <td>...</td>
                  <td>
                    {historicalDataForProject?.historicalTableData?.sunHrs?.sunHoursToday?.toFixed(
                      1
                    ) || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {sunHoursOpen ? (
            <div className="flex flex-col col-span-4 h-72 space-y-3">
              <div className="flex space-x-3 justify-end">
                <select
                  className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
                  value={historicalDataForProjectSunHrsBarChartDataYearSelected}
                  onChange={(e) =>
                    setHistoricalDataForProjectSunHrsBarChartDataSelected(
                      e.target.value
                    )
                  }
                >
                  <option disabled>Year</option>
                  {historicalDataForProjectSunHrsBarChartDataYearCount?.map(
                    (item, Index) => {
                      return <option key={Index}>{item}</option>;
                    }
                  )}
                </select>
                <select
                  className="flex items-center justify-center px-2.5 py-1 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
                  value={
                    historicalDataForProjectSunHrsBarChartDataMonthSelected
                  }
                  onChange={(e) =>
                    setHistoricalDataForProjectSunHrsBarChartDataMonthSelected(
                      e.target.value
                    )
                  }
                >
                  <option disabled>Month</option>
                  {historicalDataForProjectSunHrsBarChartDataMonthCount?.map(
                    (item, Index) => {
                      if (
                        historicalDataForProjectSunHrsBarChartDataYearSelected ===
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
              </div>

              <div
                className="flex items-center justify-center"
                style={{ width: "100%", height: "100%" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={
                      historicalDataForProjectSunHrsBarChartDataMonthly
                        ? historicalDataForProjectSunHrsBarChartDataMonthly
                        : historicalDataForProjectSunHrsBarChartDataYearly
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
                    <Bar dataKey="sunHours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <HistoricalPeakPower
              firstProjectForDefaultViewId={firstProjectForDefaultViewId}
              selectedOptionId={selectedOptionId}
              selectedOptionIdCompany={selectedOptionIdCompany}
              selectedOptionIdBuilding={selectedOptionIdBuilding}
              selectedOptionIdInverter={selectedOptionIdInverter}
            />
          )}
        </div>
      </div>
    </>
  );
}
