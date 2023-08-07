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
import HistoricalSunHours from "./historicalSunHours";

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
      <div className="w-full h-96 bg-white p-3 rounded-md">
        {sunHoursOpen ? (
          <HistoricalSunHours
            handlePeakPowerOpen={handlePeakPowerOpen}
            handleSunHoursOpen={handleSunHoursOpen}
            peakPowerOpen={peakPowerOpen}
            sunHoursOpen={sunHoursOpen}
            firstProjectForDefaultViewId={firstProjectForDefaultViewId}
            selectedOptionId={selectedOptionId}
            selectedOptionIdCompany={selectedOptionIdCompany}
            selectedOptionIdBuilding={selectedOptionIdBuilding}
            selectedOptionIdInverter={selectedOptionIdInverter}
          />
        ) : (

          <HistoricalPeakPower
            handlePeakPowerOpen={handlePeakPowerOpen}
            handleSunHoursOpen={handleSunHoursOpen}
            peakPowerOpen={peakPowerOpen}
            sunHoursOpen={sunHoursOpen}
            firstProjectForDefaultViewId={firstProjectForDefaultViewId}
            selectedOptionId={selectedOptionId}
            selectedOptionIdCompany={selectedOptionIdCompany}
            selectedOptionIdBuilding={selectedOptionIdBuilding}
            selectedOptionIdInverter={selectedOptionIdInverter}
          />
        )}
      </div>
    </>
  );
}
