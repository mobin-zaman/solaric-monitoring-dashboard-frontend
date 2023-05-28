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
import Image from "next/image";

export default function Impact({ impactData}) {
  console.log(impactData);
  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Impact
          </span>
        </div>
        <div className="w-full h-[19.5rem] grid">
          <div className="flex items-center justify-center space-x-16">
            <Image
              src="/Impact/impact1.png"
              alt="impact1"
              width={80}
              height={100}
            />
            <div className="flex flex-col w-28 items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="font-semibold text-white">
                Trees
              </span>
              <span className="text-sm font-semibold text-white">{impactData?.treesSaved?.toFixed(0)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-16 border-y-2">
            <div className="flex flex-col w-28 items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="font-semibold text-white">
                MT
              </span>
              <span className="text-sm font-semibold text-white">{impactData?.co2Reduction?.toFixed(0)}</span>
            </div>
            <Image
              src="/Impact/impact2.png"
              alt="impact1"
              width={80}
              height={100}
            />
          </div>
          <div className="flex items-center justify-center space-x-16">
            <Image
              src="/Impact/impact3.png"
              alt="impact1"
              width={80}
              height={100}
            />
            <div className="flex flex-col w-28 items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="font-semibold text-white">
                MN$
              </span>
              <span className="text-sm font-semibold text-white">...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
