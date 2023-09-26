import { useEffect, useState } from "react";
import {
  getDailyViewCollectTime,
  getImpactData,
  getImpactDataWithDateKey,
} from "../../lib/Helper";
import { useQuery } from "react-query";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Impact({
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

  const [defaultData, setDefaultData] = useState(true);

  // const {
  //   data: HistoricalData,
  //   isLoading: HistoricalDataIsLoading,
  //   error: HistoricalDataError,
  // } = useQuery(
  //   ["HistoricalData", collectionKey],
  //   () => getHistoricalData(collectionKey),
  //   {
  //     enabled: !!collectionKey && defaultData,
  //     onSuccess: (data) => {
  //       console.log("data", data);
  //     },
  //   }
  // );

  const {
    data: DailyViewCollectTimeData,
    isLoading: DailyViewCollectTimeIsLoading,
    error: DailyViewCollectTimeError,
  } = useQuery(
    ["DailyViewCollectTime", collectionKey],
    () => getDailyViewCollectTime(collectionKey),
    {
      enabled: !!collectionKey,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

  const [yearsFromData, setYearsFromData] = useState([]);
  const [monthsFromData, setMonthsFromData] = useState([]);
  const [daysFromData, setDaysFromData] = useState([]);
  const [uniqueYears1, setUniqueYears1] = useState([]);
  const [uniqueMonths1, setUniqueMonths1] = useState([]);
  // const [uniqueDays1, setUniqueDays1] = useState([]);
  const [storeYearMonth1, setStoreYearMonth1] = useState([]);
  const [storeYearMonthDay1, setStoreYearMonthDay1] = useState([]);

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (!DailyViewCollectTimeIsLoading && DailyViewCollectTimeData) {
      const tempYears = [];
      const tempMonthsDays = [];
      const tempDays = [];
      const storeYearMonth = [];
      const storeYearMonthDay = [];
      storeYearMonth.push(
        ...DailyViewCollectTimeData?.map(
          (item) => item.split("-")[0] + "-" + item.split("-")[1]
        )
      );
      storeYearMonthDay.push(
        ...DailyViewCollectTimeData?.map(
          (item) =>
            item.split("-")[0] +
            "-" +
            item.split("-")[1] +
            "-" +
            item.split("-")[2]
        )
      );

      setStoreYearMonth1(removeDuplicatesFromArray(storeYearMonth));
      setStoreYearMonthDay1(removeDuplicatesFromArray(storeYearMonthDay));

      DailyViewCollectTimeData?.forEach((item) => {
        const [year, month, day] = item.split("-");
        tempYears.push(year);
        tempMonthsDays.push(month + "-" + day);
        tempDays.push(day);
      });

      setYearsFromData(tempYears);
      setMonthsFromData(tempMonthsDays);
      setDaysFromData(tempDays);
    }
  }, [DailyViewCollectTimeData, DailyViewCollectTimeIsLoading]);

  // function removeDuplicatesFromArray(arr) {
  //   return [...new Set(arr)];
  // }

  function removeDuplicatesMonthsFromArray(arr) {
    return [...new Set(arr?.map((item) => item.split("-")[0]))];
  }

  useEffect(() => {
    setUniqueYears1(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths1(removeDuplicatesMonthsFromArray(monthsFromData));
    // setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  // useEffect(() => {
  //   if (uniqueYears1.length > 0) {
  //     setSelectedYear1(uniqueYears1[0]); // Remove the dot before [0]
  //   }
  // }, [uniqueYears1]);

  // useEffect(() => {
  //   if (uniqueMonths1.length > 0) {
  //     setSelectedMonth1(uniqueMonths1[0]);
  //   }
  // }, [uniqueMonths1]);

  // useEffect(() => {
  //   if (storeYearMonthDay1.length > 0) {
  //     const sortedDays = storeYearMonthDay1
  //       .filter(
  //         (item) =>
  //           item.split("-")[0] === selectedYear1 &&
  //           item.split("-")[1] === selectedMonth1
  //       )
  //       .map((item) => item.split("-")[2])
  //       .sort((a, b) => a.localeCompare(b));
  //     const lastIdx = sortedDays.length - 1;
  //     setSelectedDay1(sortedDays[lastIdx]);
  //   }
  // }, [selectedMonth1, storeYearMonthDay1, selectedYear1]);

  const [dateKey, setDateKey] = useState("");

  useEffect(() => {
    if (selectedYear1 && !selectedMonth1 && !selectedDay1) {
      setDateKey(`${selectedYear1}`);
    } else if (selectedYear1 && selectedMonth1 && !selectedDay1) {
      setDateKey(`${selectedYear1}-${selectedMonth1}`);
    } else if (selectedYear1 && selectedMonth1 && selectedDay1) {
      setDateKey(`${selectedYear1}-${selectedMonth1}-${selectedDay1}`);
    }
  }, [selectedYear1, selectedMonth1, selectedDay1]);

  const {
    data: ImpactData,
    isLoading: ImpactDataIsLoading,
    error: ImpactDataError,
  } = useQuery(
    ["ImpactData", collectionKey],
    () => getImpactData(collectionKey),
    {
      enabled: !!collectionKey && defaultData,
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

  const {
    data: ImpactDataWithDateKey,
    isLoading: ImpactDataWithDateKeyIsLoading,
    error: ImpactDataWithDateKeyError,
  } = useQuery(
    ["ImpactDataWithDateKey", collectionKey, dateKey],
    () => getImpactDataWithDateKey({ collectionKey, dateKey }),
    {
      enabled: !!collectionKey && !!dateKey,
      onSuccess: (data) => {
        console.log("ImpactDataWithDateKey", data);
      },
    }
  );

  const [impactDataStore, setImpactDataStore] = useState();

  useEffect(() => {
    if (!ImpactDataWithDateKeyIsLoading && ImpactDataWithDateKey) {
      setImpactDataStore(ImpactDataWithDateKey);
    } else {
      setImpactDataStore(ImpactData);
    }
  }, [ImpactDataWithDateKey, ImpactDataWithDateKeyIsLoading, ImpactData]);

  const handleSelectedYear1 = (value) => {
    setDefaultData(false);
    setSelectedYear1(value);
  };

  const handleDefaultData = () => {
    setDefaultData(true);
    setSelectedYear1("");
    setSelectedMonth1("");
    setSelectedDay1("");
    setDateKey("");
    setImpactDataStore(ImpactData);
  };

  useEffect(() => {
    setSelectedMonth1("");
    setSelectedDay1("");
  }, [selectedYear1]);

  useEffect(() => {
    setSelectedDay1("");
  }, [selectedMonth1]);

  const digitToMonth = (digit) => {
    switch (digit) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "Jan";
    }
  };

  return (
    <>
      {" "}
      <div className="text-md font-bold tracking-wide text-white border border-gray-600 flex items-center justify-center bg-gray-600 rounded-t-lg py-1.5 space-x-2">
        <span>Impact</span>
        <button onClick={() => handleDefaultData()}>
          <FontAwesomeIcon
            icon={faGlobe}
            className={`flex items-center justify-center text-md font-semibold rounded-md p-0.5 h-4 select-none border-2 ${
              defaultData
                ? "bg-[#39B54A] text-white border-[#39B54A]"
                : "bg-orange-500 text-white border-orange-500"
            }`}
          />
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-b-lg space-y-2.5 h-96 border border-gray-300">
        <div className="flex space-x-4 lg:space-x-1 xl:space-x-4 items-center justify-center h-6">
          <select
            className="flex items-center justify-center px-2 xl:px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedYear1 ? selectedYear1 : "Year"}
            onChange={(e) => handleSelectedYear1(e.target.value)}
          >
            <option disabled>Year</option>
            {uniqueYears1?.map((item, Index) => {
              return (
                <option key={Index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            className="flex items-center justify-center px-2 xl:px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedMonth1 ? selectedMonth1 : "Month"}
            onChange={(e) => setSelectedMonth1(e.target.value)}
            disabled={!selectedYear1}
          >
            <option disabled>Month</option>
            {storeYearMonth1.map((item1, index) => {
              if (item1.split("-")[0] === selectedYear1) {
                return (
                  <option key={index} value={item1.split("-")[1]}>
                    {digitToMonth(item1.split("-")[1])}
                  </option>
                );
              }
              return null; // Make sure to return null when conditions are not met
            })}
          </select>
          <select
            className="flex items-center justify-center px-2 xl:px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
            value={selectedDay1 ? selectedDay1 : "Day"}
            onChange={(e) => setSelectedDay1(e.target.value)}
            disabled={!selectedMonth1}
          >
            <option disabled>Day</option>
            {storeYearMonthDay1
              .filter(
                (item1) =>
                  item1.split("-")[0] === selectedYear1 &&
                  item1.split("-")[1] === selectedMonth1
              )
              .map((item1) => item1.split("-")[2]) // Extract day values
              .sort((a, b) => a.localeCompare(b)) // Sort day values
              .reverse() // Reverse the array order
              .map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
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
              </div>
            </div>
            <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
              {Math.round(impactDataStore?.treesPlanted)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") === "NaN"
                ? 0
                : Math.round(impactDataStore?.treesPlanted)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              </div>
            </div>
            <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
              {Math.round(impactDataStore?.co2EmissionReduction)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") === "NaN"
                ? 0
                : Math.round(impactDataStore?.co2EmissionReduction)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              </div>
            </div>
            <span className="text-[0.7rem] 2xl:text-sm text-[#44576b] font-semibold">
              {Math.round(impactDataStore?.moneySaved)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") === "NaN"
                ? 0
                : Math.round(impactDataStore?.moneySaved)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="text-[#44576b] font-semibold text-[0.7rem] 2xl:text-sm">
              USD
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
