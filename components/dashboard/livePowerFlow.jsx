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

export default function LivePowerFlow() {
  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md">
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
        <div className="flex w-full h-full items-center justify-center">
        </div>
      </div>
    </>
  );
}
