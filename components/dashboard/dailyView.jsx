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

export default function DailyView() {
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

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Daily View
          </span>
          <FontAwesomeIcon icon={faRotate} />
          <div className="flex rounded-md bg-gray-200">
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
              Plant
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] select-none border-r">
              Building
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
              Inverter
            </button>
          </div>
          <div className="flex rounded-md bg-gray-200">
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
              Year
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] select-none border-r">
              Month
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
              Day
            </button>
          </div>
        </div>
        <div className="flex w-full h-full items-center justify-between">
          <div
            className="flex justify-center items-center"
            style={{ width: "30%", height: "80%" }}
          >
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3">
                <span className="text-sm font-semibold text-white">
                  Generation, KWh
                </span>
                <span className="text-sm font-semibold text-white">2023</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3">
                <span className="text-sm font-semibold text-white">
                  Sun - Hrs
                </span>
                <span className="text-sm font-semibold text-white">1.29</span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center"
            style={{ width: "70%", height: "80%" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={data}
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
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}