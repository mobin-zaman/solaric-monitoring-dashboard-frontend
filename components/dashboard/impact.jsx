import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPen,
  faArrowDown,
  faPlus,
  faSearch,
  faEye,
  faCopy,
  faIdCard,
  faClipboard,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Impact({ impactData }) {
  console.log(impactData);
  return (
    <div className="w-full bg-white p-3 rounded-md space-y-2.5 h-96">
      <span className="w-full text-xl font-semibold tracking-wide text-[#25476A] h-10">
        Impact
      </span>
      <div className="flex space-x-4 items-end justify-end h-6">
        {/* <button
              className={`flex items-center justify-center h-7 p-2 text-sm font-semibold rounded-md select-none border border-[#39B54A] ${
                peakPowerOpen
                  ? "bg-[#39B54A] text-white"
                  : "bg-white text-[#39B54A]"
              }`}
              // onClick={() => handlePeakPowerOpen()}
            >
              Default
            </button> */}
        <select
          className="flex items-center justify-center px-2.5 h-7 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
          value={"Year"}
          onChange={(e) => setSelectedYear1(e.target.value)}
        >
          <option disabled>Year</option>
        </select>
        <select
          className="flex items-center justify-center px-2.5 h-7 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
          value={"Month"}
          onChange={(e) => setSelectedMonth1(e.target.value)}
        >
          <option disabled>Month</option>
        </select>
        <select
          className="flex items-center justify-center px-2.5 h-7 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
          value={"Day"}
          onChange={(e) => setSelectedDay1(e.target.value)}
        >
          <option disabled>Day</option>
        </select>
      </div>
      <div className="grid grid-cols-1 h-72">
        <div className="items-center grid grid-cols-3 text-center">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 xl:h-14 xl:w-14 2xl:h-[4rem] 2xl:w-[4rem] flex items-center justify-center">
            <Image
              src="/Impact/impact1111.png"
              alt="impact2"
              width={150}
              height={100}
            />
          </div></div>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
            {impactData?.co2Reduction?.toFixed(0)}11111
          </span>
          <span className="text-[#44576b] font-semibold text-[0.7rem] 2xl:text-sm">
            Trees
          </span>
        </div>
        <div className="items-center grid grid-cols-3 text-center">
        <div className="flex items-center justify-center">
        <div className="h-12 w-12 xl:h-14 xl:w-14 2xl:h-[4rem] 2xl:w-[4rem] flex items-center justify-center">
            <Image
              src="/Impact/impact2222.png"
              alt="impact3"
              width={80}
              height={100}
            />
          </div></div>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
            1111
          </span>
          <span className="text-[#44576b] font-semibold text-[0.7rem] 2xl:text-sm">
            MT
          </span>
        </div>
        <div className="items-center grid grid-cols-3 text-center">
        <div className="flex items-center justify-center">
        <div className="h-12 w-12 xl:h-14 xl:w-14 2xl:h-[4rem] 2xl:w-[4rem] flex items-center justify-center">
            <Image
              src="/Impact/impact3333.png"
              alt="impact1"
              width={80}
              height={100}
            />
          </div></div>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
            {impactData?.treesSaved?.toFixed(0)}1111
          </span>
          <span className="text-[#44576b] font-semibold text-[0.7rem] 2xl:text-sm">
            USD
          </span>
        </div>
      </div>
    </div>
  );
}
