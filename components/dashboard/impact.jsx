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

export default function Impact() {
  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            impact
          </span>
          <div className="flex rounded-md bg-gray-200">
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
              Plant
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
              KEPZ
            </button>
          </div>
          <div className="flex rounded-md bg-gray-200">
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
              Company
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
              All
            </button>
          </div>
        </div>
        <div className="w-full h-[19.5rem] grid">
          <div className="flex items-center justify-center space-x-16">
            <Image
              src="/Impact/impact1.png"
              alt="impact1"
              width={80}
              height={100}
            />
            <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="text-sm font-semibold text-white">
                Generation, KWh
              </span>
              <span className="text-sm font-semibold text-white">2023</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-16 border-y-2">
            <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="text-sm font-semibold text-white">
                Generation, KWh
              </span>
              <span className="text-sm font-semibold text-white">2023</span>
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
            <div className="flex flex-col items-center justify-center bg-[#25476A] rounded-md p-3">
              <span className="text-sm font-semibold text-white">
                Generation, KWh
              </span>
              <span className="text-sm font-semibold text-white">2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
