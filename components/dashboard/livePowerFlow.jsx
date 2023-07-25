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
import { useState, useEffect, useRef } from "react";

export default function LivePowerFlow({
  selectedOptionIdInverter,
  selectedOptionIdBuilding,
  selectedOptionIdCompany,
  selectedOptionId,
}) {
  const [value0, setValue0] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue0((prevValue) => (prevValue + 10) % 110); // Increment the value from 0 to 100 and then reset to 0
    }, 1000); // Change the animation duration here (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When the animation completes, reset the width to 0
    if (value0 === 100) {
      const timeout = setTimeout(() => {
        setValue0(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value0]);

  const [value1, setValue1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue1((prevValue) => (prevValue - 10 + 110) % 110); // Decrement the value from 100 to 0 and then reset to 100
    }, 500); // Change the animation duration here (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When the animation completes, reset the value to 100
    if (value1 === 0) {
      const timeout = setTimeout(() => {
        setValue1(100);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value1]);

  return (
    <>
      <div className="w-full h-96 bg-white p-3 rounded-md space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tracking-wide text-[#25476A]">
            Live Power Flow
          </span>
        </div>
        {selectedOptionId &&
          !selectedOptionIdCompany &&
          !selectedOptionIdBuilding &&
          !selectedOptionIdInverter && (
            <div className="w-full h-[19.5rem] grid">
              <div className="grid grid-cols-7">
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/1.png"
                    alt="impact1"
                    width={80}
                    height={90}
                  />
                </div>
                <div className="flex flex-col items-center justify-center col-span-2 space-y-7">
                  <div className="flex flex-col items-center justify-center ">
                    <span>1</span>
                    <div className="w-48 h-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-red-600 transition-all duration-300 ${
                          value0 === 100 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>5</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/2.png"
                    alt="impact1"
                    width={90}
                    height={100}
                  />
                </div>
                <div className="flex items-center justify-center col-span-2">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>8</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/33.png"
                    alt="impact1"
                    width={130}
                    height={100}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center space-x-7">
                  <div className="flex space-x-2 items-center">
                    <span>8</span>
                    <div className="h-24 w-2.5 bg-red-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ height: `${value1}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-green-600 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ height: `${value0}%` }}
                      ></div>
                    </div>
                    <span>3</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/LivePowerFlow/44.png"
                      alt="impact1"
                      width={130}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        {selectedOptionId &&
          selectedOptionIdCompany &&
          !selectedOptionIdBuilding &&
          !selectedOptionIdInverter && (
            <div className="w-full h-[19.5rem] grid">
              <div className="grid grid-cols-7">
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/2.png"
                    alt="impact1"
                    width={80}
                    height={90}
                  />
                </div>
                <div className="flex flex-col items-center justify-center col-span-2 space-y-7">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>5</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/5.png"
                    alt="impact1"
                    width={90}
                    height={100}
                  />
                </div>
                <div className="flex items-center justify-center col-span-2">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>8</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/33.png"
                    alt="impact1"
                    width={130}
                    height={100}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center space-x-7">
                  <div className="flex space-x-2 items-center">
                    <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-green-600 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ height: `${value0}%` }}
                      ></div>
                    </div>
                    <span>3</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/LivePowerFlow/44.png"
                      alt="impact1"
                      width={130}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        {selectedOptionId &&
          selectedOptionIdCompany &&
          selectedOptionIdBuilding &&
          !selectedOptionIdInverter && (
            <div className="w-full h-[19.5rem] grid">
              <div className="grid grid-cols-7">
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/2.png"
                    alt="impact1"
                    width={80}
                    height={90}
                  />
                </div>
                <div className="flex flex-col items-center justify-center col-span-2 space-y-7">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>5</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/5.png"
                    alt="impact1"
                    width={90}
                    height={100}
                  />
                </div>
                <div className="flex items-center justify-center col-span-2">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-48 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-gray-300 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ width: `${value1}%` }}
                      ></div>
                    </div>
                    <span>8</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/33.png"
                    alt="impact1"
                    width={130}
                    height={100}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center space-x-7">
                  <div className="flex space-x-2 items-center">
                    <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full bg-green-600 transition-all duration-300 ${
                          value0 === 0 ? "reset-width" : ""
                        }`}
                        style={{ height: `${value0}%` }}
                      ></div>
                    </div>
                    <span>3</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/LivePowerFlow/44.png"
                      alt="impact1"
                      width={130}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
