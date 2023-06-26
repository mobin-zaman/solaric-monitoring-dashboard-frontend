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
    <div className="w-full bg-white p-3 rounded-md space-y-10 h-96">
      <span className="w-full text-xl font-semibold tracking-wide text-[#25476A]">
        Impact
      </span>
      <div className="grid grid-cols-2 items-center justify-center gap-24">

        <div className="flex flex-col items-end justify-center">
          <div className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 flex flex-col items-center justify-center">
            <Image
              src="/Impact/impact10.png"
              alt="impact2"
              width={150}
              height={100}
            />
                      <span className="text-[#44576b] font-semibold mt-2 text-[0.7rem] 2xl:text-sm">MT</span>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
            {impactData?.co2Reduction?.toFixed(0)}
          </span>
          </div>

        </div>
        <div className="flex flex-col items-start justify-center">
        <div className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 flex flex-col items-center justify-center">
            <Image
              src="/Impact/impact9.png"
              alt="impact3"
              width={100}
              height={100}
            />
                      <span className="text-[#44576b] font-semibold mt-2 text-[0.7rem] 2xl:text-sm">Money Saved</span>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">...</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols items-center justify-center">
        <div className="flex flex-col items-center justify-center">
        <div className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 flex flex-col items-center justify-center">
            <Image
              src="/Impact/impact11.png"
              alt="impact1"
              width={80}
              height={100}
            />
                      <span className="text-[#44576b] font-semibold mt-2 text-[0.7rem] 2xl:text-sm">Trees</span>
          <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
            {impactData?.treesSaved?.toFixed(0)}
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}
