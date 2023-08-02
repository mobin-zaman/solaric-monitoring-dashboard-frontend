import { useEffect, useState } from "react";
import {
  getDailyViewCollectTime,
  getImpactData,
  getImpactDataWithDateKey,
} from "../../lib/Helper";
import { useQuery } from "react-query";
import Image from "next/image";

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
  const [uniqueDays1, setUniqueDays1] = useState([]);

  useEffect(() => {
    if (!DailyViewCollectTimeIsLoading && DailyViewCollectTimeData) {
      const tempYears = [];
      const tempMonthsDays = [];
      const tempDays = [];

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

  function removeDuplicatesFromArray(arr) {
    return [...new Set(arr)];
  }

  function removeDuplicatesMonthsFromArray(arr) {
    return [...new Set(arr?.map((item) => item.split("-")[0]))];
  }

  useEffect(() => {
    setUniqueYears1(removeDuplicatesFromArray(yearsFromData));
    setUniqueMonths1(removeDuplicatesMonthsFromArray(monthsFromData));
    setUniqueDays1(removeDuplicatesFromArray(daysFromData));
  }, [yearsFromData, monthsFromData, daysFromData]);

  const [selectedYear1, setSelectedYear1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");

  // useEffect(() => {
  //   if (uniqueYears1.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedYear1(date[0]);
  //     } else {
  //       const sortedYears = uniqueYears1.sort(); // Sort the uniqueYears1 array
  //       const lastIdx = sortedYears.length - 1;
  //       setSelectedYear1(sortedYears[lastIdx]);
  //     }
  //   }
  // }, [uniqueYears1]);

  // useEffect(() => {
  //   if (uniqueMonths1.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedMonth1(date[1]);
  //     } else {
  //       const sortedMonths = uniqueMonths1.sort(); // Sort the uniqueMonths1 array
  //       const lastIdx = sortedMonths.length - 1;
  //       setSelectedMonth1(sortedMonths[lastIdx]);
  //     }
  //   }
  // }, [uniqueMonths1]);

  // useEffect(() => {
  //   if (monthsFromData.length > 0) {
  //     if (localStorage.getItem("date")) {
  //       const date = localStorage.getItem("date").split("-");
  //       setSelectedDay1(date[2]);
  //     } else {
  //       const sortedDays =       monthsFromData
  //       .filter((item) => item.split("-")[0] === selectedMonth1)
  //       .map((item) => item.split("-")[1])
  //       .sort((a, b) => a.localeCompare(b));

  //       const lastIdx = sortedDays.length - 1;
  //       setSelectedDay1(sortedDays[lastIdx]);
  //     }
  //   }
  // }, [selectedMonth1, monthsFromData]);

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
    <div className="w-full bg-white p-3 rounded-md space-y-2.5 h-96">
      <span className="w-full text-xl font-semibold tracking-wide text-[#25476A] h-10">
        Impact
      </span>
      <div className="flex space-x-4 items-end justify-end h-6">
        <button
          className={`flex items-center justify-center h-6 p-2 text-sm font-semibold rounded-md select-none border border-[#39B54A] ${
            defaultData ? "bg-[#39B54A] text-white" : "bg-white text-[#39B54A]"
          }`}
          onClick={() => handleDefaultData()}
        >
          Default
        </button>
        <select
          className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
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
          className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
          value={selectedMonth1 ? selectedMonth1 : "Month"}
          onChange={(e) => setSelectedMonth1(e.target.value)}
          disabled={!selectedYear1}
        >
          <option disabled>Month</option>
          {uniqueMonths1?.sort().map((item, index) => {
            return (
              <option key={index} value={item}>
                {digitToMonth(item)}
              </option>
            );
          })}
        </select>
        <select
          className="flex items-center justify-center px-2.5 h-6 text-sm text-[#25476A] bg-white border-2 border-[#25476A] rounded-md select-none"
          value={selectedDay1 ? selectedDay1 : "Day"}
          onChange={(e) => setSelectedDay1(e.target.value)}
          disabled={!selectedMonth1}
        >
          <option disabled>Day</option>
          {monthsFromData
            ?.map((item, Index) => {
              if (item.split("-")[0] === selectedMonth1) {
                return item; // Return the original item
              } else {
                return null; // Skip items that don't match the condition
              }
            })
            .filter((item) => item !== null) // Filter out null items
            .sort((a, b) => {
              const aValue = a.split("-")[1];
              const bValue = b.split("-")[1];
              return aValue.localeCompare(bValue); // Sort based on the split value
            })
            .map((item, index) => (
              <option key={index} value={item.split("-")[1]}>
                {item.split("-")[1]}
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
            {Math.round(impactDataStore?.treesSaved)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") === "NaN"
              ? 0
              : Math.round(impactDataStore?.treesSaved)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="text-[#44576b] font-semibold text-[0.7rem] 2xl:text-sm">
            USD
          </span>
        </div>
      </div>
    </div>
  );
}
