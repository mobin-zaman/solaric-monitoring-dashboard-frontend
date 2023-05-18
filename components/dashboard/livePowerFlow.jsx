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

export default function LivePowerFlow() {
  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Live Power Flow
          </span>
          <div className="flex rounded-md bg-gray-200">
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-l-md select-none border-r">
              Plant
            </button>
            <button className="flex items-center justify-center h-8 p-2 text-sm text-white font-semibold bg-[#39B54A] rounded-r-md select-none">
              KEPZ
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="flex items-center justify-center">
            <Image
              src="/LivePowerFlow/LivePowerFlow1.png"
              alt="impact1"
              width={120}
              height={100}
            />
          </div>
          <div className="flex flex-col items-center justify-center col-span-2 space-y-5">
            <div className="flex items-center justify-center">
              <div className="relative transition-transform duration-500 ease-in-out animate-flowX">
                <div
                  class="w-0 h-0 
  border-t-[8px] border-t-transparent
  border-r-[14px] border-r-red-500
  border-b-[8px] border-b-transparent rotate-180 absolute -top-1 -right-3.5"
                ></div>
                <div className="h-2 w-28 bg-red-500"></div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative transition-transform duration-500 ease-in-out animate-flowReverseX">
                <div
                  class="w-0 h-0 
  border-t-[8px] border-t-transparent
  border-r-[14px] border-r-green-500
  border-b-[8px] border-b-transparent rotate-0 absolute -top-1 -left-3.5"
                ></div>
                <div className="h-2 w-28 bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/LivePowerFlow/LivePowerFlow2.png"
              alt="impact1"
              width={90}
              height={100}
            />
          </div>
          <div className="flex items-center justify-center col-span-2">
            <div className="h-20 flex items-center justify-center">
              <div className="relative transition-transform duration-500 ease-in-out animate-flowReverseX">
                <div
                  class="w-0 h-0 
  border-t-[8px] border-t-transparent
  border-r-[14px] border-r-green-500
  border-b-[8px] border-b-transparent rotate-0 absolute -top-1 -left-3.5"
                ></div>
                <div className="h-2 w-28 bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/LivePowerFlow/LivePowerFlow4.png"
              alt="impact1"
              width={130}
              height={100}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 items-center justify-center">
          <div className="col-span-7 flex items-center justify-center space-x-5">
            <div className="h-20">
              <div className="relative transition-transform duration-500 ease-in-out animate-flowY">
                <div
                  class="w-0 h-0 
  border-t-[8px] border-t-transparent
  border-r-[14px] border-r-red-500
  border-b-[8px] border-b-transparent rotate-90 absolute -top-3.5 -left-[0.13rem]"
                ></div>
                <div className="h-10 w-2 bg-red-500"></div>
              </div>
            </div>
            <div className="h-20">
              <div className="relative transition-transform duration-500 ease-in-out animate-flowReverseY">
                <div
                  class="w-0 h-0 
  border-t-[8px] border-t-transparent
  border-r-[14px] border-r-green-500
  border-b-[8px] border-b-transparent -rotate-90 absolute -bottom-3.5 -left-[0.13rem]"
                ></div>
                <div className="h-10 w-2 bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 items-center justify-center">
          <div className="col-span-7 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/LivePowerFlow/LivePowerFlow3.png"
                alt="impact1"
                width={130}
                height={100}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex  items-center justify-center">
          <div className="relative h-2">
            <div className="absolute inset-0 bg-blue-500 rounded-full">
              <div className="h-2 w-32 bg-green-500 animate-flowReverse"></div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
