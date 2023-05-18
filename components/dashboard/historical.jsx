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

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Historical() {

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Historical
          </span>
        </div>
        <div className="flex">
          <div
            className="flex justify-end items-center space-x-5"
            style={{ width: "45%" }}
          >
            <FontAwesomeIcon icon={faRotate} />
            <div className="flex rounded-md bg-gray-200">
              <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
                Plant
              </button>
              <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
                KEPZ
              </button>
            </div>
          </div>
          <div
            className="flex justify-end items-center space-x-5"
            style={{ width: "55%" }}
          >
            <FontAwesomeIcon icon={faRotate} />
            <div className="flex rounded-md bg-gray-200">
              <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
                Plant
              </button>
              <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
                KEPZ
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full h-72 justify-between">
          <div
            className="flex justify-center items-start"
            style={{ width: "45%", height: "100%" }}
          >
            <table className="table-fixed w-full border rounded-md select-none">
              <tbody className="text-center">
                <tr className="bg-gray-200 text-black h-10 font-semibold">
                  <td></td>
                  <td>Prod</td>
                  <td>Export</td>
                  <td>Sun-Hrs</td>
                </tr>
                <tr className=" text-black h-16">
                  <td>Today</td>
                  <td>100 KW</td>
                  <td>2.59</td>
                  <td>5.21</td>
                </tr>
                <tr className=" text-black h-16">
                  <td>Month</td>
                  <td>100 KW</td>
                  <td>2.59</td>
                  <td>5.21</td>
                </tr>
                <tr className=" text-black h-16">
                  <td>Year</td>
                  <td>100 KW</td>
                  <td>2.59</td>
                  <td>5.21</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="flex items-center justify-end"
            style={{ width: "55%", height: "100%" }}
          >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
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
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
