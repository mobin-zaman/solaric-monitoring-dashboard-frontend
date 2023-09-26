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
import { getLivePowerFlowData } from "../../lib/Helper";
import { useQuery } from "react-query";

export default function LivePowerFlow({
  selectedOptionIdInverter,
  selectedOptionIdBuilding,
  selectedOptionIdCompany,
  selectedOptionId,
}) {
  const [collectionKey, setCollectionKey] = useState({});

  useEffect(() => {
    if (
      selectedOptionId &&
      !selectedOptionIdCompany &&
      !selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        project: selectedOptionId,
      });
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      !selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        company: selectedOptionIdCompany,
      });
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      selectedOptionIdBuilding &&
      !selectedOptionIdInverter
    ) {
      setCollectionKey({
        building: selectedOptionIdBuilding,
      });
    } else if (
      selectedOptionId &&
      selectedOptionIdCompany &&
      selectedOptionIdBuilding &&
      selectedOptionIdInverter
    ) {
      setCollectionKey({
        inverter: selectedOptionIdInverter,
      });
    }
  }, [
    selectedOptionId,
    selectedOptionIdCompany,
    selectedOptionIdBuilding,
    selectedOptionIdInverter,
  ]);

  const {
    data: LivePowerFlowData,
    isLoading: LivePowerFlowIsLoading,
    error: LivePowerFlowError,
  } = useQuery(
    ["LivePowerFlowData", collectionKey],
    () => getLivePowerFlowData(collectionKey),
    {
      enabled: !!collectionKey,
      onSuccess: (data) => {
        console.log("LivePowerFlowData", data);
      },
    }
  );

  const [LivePowerFlowDataStore, setLivePowerFlowDataStore] = useState();

  useEffect(() => {
    if (!LivePowerFlowIsLoading && LivePowerFlowData) {
      setLivePowerFlowDataStore(LivePowerFlowData);
    }
    console.log("LivePowerFlowDataStore", LivePowerFlowDataStore);
  }, [LivePowerFlowData, LivePowerFlowIsLoading, LivePowerFlowDataStore]);

  ////////////////////////////////////////

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
          <div className="text-md font-bold tracking-wide text-white border border-gray-600 flex items-center justify-center bg-gray-600 rounded-t-lg py-1.5">
          Live Power Flow
          </div>
          <div className="w-full h-96 bg-white p-3 rounded-b-lg border border-gray-300 flex items-center justify-center">
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
                <div className="flex flex-col items-center justify-center col-span-2 space-y-4">
                  {LivePowerFlowDataStore?.currentMeterPower?.export ? (
                    <div className="flex flex-col items-center justify-center ">
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.export?.toFixed(
                          2
                        )}
                      </span>
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : null}
                  {LivePowerFlowDataStore?.currentMeterPower?.import ? (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.import?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
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
                  {LivePowerFlowDataStore?.currentInverterPower ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentInverterPower?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/61.png"
                    alt="impact1"
                    width={130}
                    height={100}
                  />
                </div>
              </div>
              <div
                className={`grid items-center justify-center ${
                  LivePowerFlowDataStore?.currentLoad?.grid &&
                  LivePowerFlowDataStore?.currentLoad?.solar
                    ? "grid-cols-8 gap-4"
                    : "grid-cols-4"
                }`}
              >
                {LivePowerFlowDataStore?.currentLoad?.grid ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentLoad?.grid?.toFixed(2)}
                      </span>
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {LivePowerFlowDataStore?.currentLoad?.solar ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-green-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentLoad?.solar?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/LivePowerFlow/60.png"
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
                <div className="flex flex-col items-center justify-center col-span-2 space-y-4">
                  {LivePowerFlowDataStore?.currentMeterPower?.export ? (
                    <div className="flex flex-col items-center justify-center ">
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.export?.toFixed(
                          2
                        )}
                      </span>
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : null}
                  {LivePowerFlowDataStore?.currentMeterPower?.import ? (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.import?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
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
                  {LivePowerFlowDataStore?.currentInverterPower ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentInverterPower?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/LivePowerFlow/63.png"
                    alt="impact1"
                    width={130}
                    height={100}
                  />
                </div>
              </div>
              <div
                className={`grid items-center justify-center ${
                  LivePowerFlowDataStore?.currentLoad?.grid &&
                  LivePowerFlowDataStore?.currentLoad?.solar
                    ? "grid-cols-8 gap-4"
                    : "grid-cols-4"
                }`}
              >
                {LivePowerFlowDataStore?.currentLoad?.grid ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentLoad?.grid?.toFixed(2)}
                      </span>
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {LivePowerFlowDataStore?.currentLoad?.solar ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-green-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentLoad?.solar?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-7 items-center justify-center">
                <div className="col-span-7 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/LivePowerFlow/62.png"
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
                <div className="flex flex-col items-center justify-center col-span-2 space-y-4">
                  {LivePowerFlowDataStore?.currentMeterPower?.export ? (
                    <div className="flex flex-col items-center justify-center ">
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.export?.toFixed(
                          2
                        )}
                      </span>
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : null}
                  {LivePowerFlowDataStore?.currentMeterPower?.import ? (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 100 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentMeterPower?.import?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
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
                  {LivePowerFlowDataStore?.currentInverterPower ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 sm:w-36 2xl:w-44 h-2.5 bg-green-600 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-gray-300 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ width: `${value1}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentInverterPower?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : null}
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
              <div
                className={`grid items-center justify-center ${
                  LivePowerFlowDataStore?.currentLoad?.grid &&
                  LivePowerFlowDataStore?.currentLoad?.solar
                    ? "grid-cols-8 gap-4"
                    : "grid-cols-4"
                }`}
              >
                {LivePowerFlowDataStore?.currentLoad?.grid ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <span className="flex items-center justify-center text-xs font-semibold text-red-600">
                        {LivePowerFlowDataStore?.currentLoad?.grid?.toFixed(2)}
                      </span>
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-red-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {LivePowerFlowDataStore?.currentLoad?.solar ? (
                  <div
                    className={`col-span-4 flex items-center space-x-4 ${
                      LivePowerFlowDataStore?.currentLoad?.grid &&
                      LivePowerFlowDataStore?.currentLoad?.solar
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex space-x-2 items-center ${
                        LivePowerFlowDataStore?.currentLoad?.grid &&
                        LivePowerFlowDataStore?.currentLoad?.solar
                          ? ""
                          : "grid grid-cols-2 justify-items-end"
                      }`}
                    >
                      <div className="h-24 w-2.5 bg-gray-300 rounded-md overflow-hidden relative">
                        <div
                          className={`h-full bg-green-600 transition-all duration-300 ${
                            value0 === 0 ? "reset-width" : ""
                          }`}
                          style={{ height: `${value0}%` }}
                        ></div>
                      </div>
                      <span className="flex items-center justify-center text-xs font-semibold text-green-600">
                        {LivePowerFlowDataStore?.currentLoad?.solar?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : null}
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
        {/* {selectedOptionId &&
          selectedOptionIdCompany &&
          selectedOptionIdBuilding &&
          selectedOptionIdInverter && (
            <div className="w-full h-[19.5rem] grid"></div>
          )} */}
      </div>
    </>
  );
}
