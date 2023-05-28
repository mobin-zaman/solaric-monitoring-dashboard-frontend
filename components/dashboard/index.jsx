import DailyView from "./dailyView";
import LivePowerFlow from "./livePowerFlow";
import Historical from "./historical";
import Impact from "./impact";
import { useState, useRef, useEffect, use } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getProjects,
  searchProject,
  getProject,
  searchCompany,
  getCompany,
  searchBuilding,
  getBuilding, 
  searchInverterForBuilding,
  getHistoricalDataForProject,
  getHistoricalDataForCompany,
  getHistoricalDataForBuilding,
  getHistoricalDataForInverter,
  getHistoricalDataForProjectSunHrsBarChartData,
  getHistoricalDataForCompanySunHrsBarChartData,
  getHistoricalDataForBuildingSunHrsBarChartData,
  getHistoricalDataForInverterSunHrsBarChartData,
  getImpactDataForProject,
  getImpactDataForCompany,
  getImpactDataForBuilding,
  getImpactDataForInverter,
} from "@/lib/Helper";

export default function Index() {

  //default view
  const {
    data: allProject,
    isLoading,
    isError,
    refetch,
  } = useQuery("projects", () => getProjects(), {
    enabled: true, //enable query
  });

  const [selectedOption, setSelectedOption] = useState();
  const [firstProjectForDefaultViewId, setFirstProjectForDefaultViewId] =
    useState(null);

  useEffect(() => {
    if (allProject) {
      console.log(allProject[0]?.name, "all project");
      setSelectedOption(allProject[0]?.name);
      setSelectedOptionId(allProject[0]?.id);
      setFirstProjectForDefaultViewId(allProject[0]?.id);
    }
  }, [allProject]);

  //project dropdown

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (id, name) => {
    setSelectedOptionId(id);
    setSelectedOption(name);
    setIsOpen(false);
    setInputValue("");
    setSelectedOptionCompany("Select Company");
    setSelectedOptionIdCompany(null);
    setInputValueCompany("");
    setSelectedOptionBuilding("Select Building");
    setSelectedOptionIdBuilding(null);
    setInputValueBuilding("");
  };

  const handleProjectSearch = (e) => {
    setSearchOn(true);
    const searchPromise = searchProject(e.target.value);

    if (e.target.value.length < 1) {
      setSearchResult1(null);
      setSearchOn(false);
      setSearchResultEmpty(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmpty(true);
            } else {
              setSearchResultEmpty(false);
              setSearchResult1(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //company dropdown

  const project = useQuery(
    ["projects", selectedOptionId],
    () => getProject(selectedOptionId),
    {
      enabled: selectedOptionId !== null,
    }
  );

  // const [projectData, setProjectData] = useState(null);

  // useEffect(() => {
  //   if (selectedOptionId !== null) {
  //     project.refetch();
  //   }
  //   setProjectData(project.data);
  // }, [selectedOptionId, project]);

  // console.log(project.data, "project data");

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState("Select Company");
  const [selectedOptionIdCompany, setSelectedOptionIdCompany] = useState(null);
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [searchOnCompany, setSearchOnCompany] = useState(false);
  const [searchResult1Company, setSearchResult1Company] = useState([]);
  const [searchResultEmptyCompany, setSearchResultEmptyCompany] =
    useState(false);

  const dropdownRefCompany = useRef(null);

  const toggleDropdownCompany = () => {
    setIsOpenCompany(!isOpenCompany);
  };

  const selectOptionCompany = (id, name) => {
    setSelectedOptionIdCompany(id);
    setSelectedOptionCompany(name);
    setIsOpenCompany(false);
    setInputValueCompany("");
    setSelectedOptionBuilding("Select Building");
    setSelectedOptionIdBuilding(null);
    setInputValueBuilding("");
  };

  const handleCompanySearch = (e) => {
    setSearchOnCompany(true);
    const searchPromise = searchCompany({
      search: e.target.value,
      projectId: selectedOptionId,
    });

    if (e.target.value.length < 1) {
      setSearchResult1Company(null);
      setSearchOnCompany(false);
      setSearchResultEmptyCompany(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmptyCompany(true);
            } else {
              setSearchResultEmptyCompany(false);
              setSearchResult1Company(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleClickOutsideCompany = (event) => {
    if (
      dropdownRefCompany.current &&
      !dropdownRefCompany.current.contains(event.target)
    ) {
      setIsOpenCompany(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideCompany);

    return () => {
      document.removeEventListener("click", handleClickOutsideCompany);
    };
  }, []);

  //building dropdown

  const company = useQuery(
    ["company", selectedOptionIdCompany],
    () => getCompany(selectedOptionIdCompany),
    {
      enabled: selectedOptionIdCompany !== null,
    }
  );

  // const [companyData, setCompanyData] = useState(null);

  // useEffect(() => {
  //   if (selectedOptionIdCompany !== null) {
  //     company.refetch();
  //   }
  //   setCompanyData(company.data);
  // }, [selectedOptionIdCompany, company]);

  // console.log(company.data, "company data");

  const [isOpenBuilding, setIsOpenBuilding] = useState(false);
  const [selectedOptionBuilding, setSelectedOptionBuilding] =
    useState("Select Building");
  const [selectedOptionIdBuilding, setSelectedOptionIdBuilding] =
    useState(null);
  const [inputValueBuilding, setInputValueBuilding] = useState("");
  const [searchOnBuilding, setSearchOnBuilding] = useState(false);
  const [searchResult1Building, setSearchResult1Building] = useState([]);
  const [searchResultEmptyBuilding, setSearchResultEmptyBuilding] =
    useState(false);

  const dropdownRefBuilding = useRef(null);

  const toggleDropdownBuilding = () => {
    setIsOpenBuilding(!isOpenBuilding);
  };

  const selectOptionBuilding = (id, name) => {
    setSelectedOptionIdBuilding(id);
    setSelectedOptionBuilding(name);
    setIsOpenBuilding(false);
    setInputValueBuilding("");
  };

  const handleBuildingSearch = (e) => {
    setSearchOnBuilding(true);
    const searchPromise = searchBuilding({
      search: e.target.value,
      companyId: selectedOptionIdCompany,
    });

    if (e.target.value.length < 1) {
      setSearchResult1Building(null);
      setSearchOnBuilding(false);
      setSearchResultEmptyBuilding(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmptyBuilding(true);
            } else {
              setSearchResultEmptyBuilding(false);
              setSearchResult1Building(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleClickOutsideBuilding = (event) => {
    if (
      dropdownRefBuilding.current &&
      !dropdownRefBuilding.current.contains(event.target)
    ) {
      setIsOpenBuilding(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideBuilding);

    return () => {
      document.removeEventListener("click", handleClickOutsideBuilding);
    };
  }, []);

  //inverter dropdown

  const building = useQuery(
    ["building", selectedOptionIdBuilding],
    () => getBuilding(selectedOptionIdBuilding),
    {
      enabled: selectedOptionIdBuilding !== null,
    }
  );

  // const [buildingData, setBuildingData] = useState(null);

  // useEffect(() => {
  //   if (selectedOptionIdBuilding !== null) {
  //     building.refetch();
  //   }
  //   setBuildingData(building.data);
  // }, [selectedOptionIdBuilding, building]);

  // console.log(building.data, "building data");

  const [isOpenInverter, setIsOpenInverter] = useState(false);
  const [selectedOptionInverter, setSelectedOptionInverter] =
    useState("Select Inverter");
  const [selectedOptionIdInverter, setSelectedOptionIdInverter] =
    useState(null);
  const [inputValueInverter, setInputValueInverter] = useState("");
  const [searchOnInverter, setSearchOnInverter] = useState(false);
  const [searchResult1Inverter, setSearchResult1Inverter] = useState([]);
  const [searchResultEmptyInverter, setSearchResultEmptyInverter] =
    useState(false);

  const dropdownRefInverter = useRef(null);

  const toggleDropdownInverter = () => {
    setIsOpenInverter(!isOpenInverter);
  };

  const selectOptionInverter = (id, deviceSn) => {
    setSelectedOptionIdInverter(id);
    setSelectedOptionInverter(deviceSn);
    setIsOpenInverter(false);
    setInputValueInverter("");
  };

  const handleInverterSearch = (e) => {
    setSearchOnInverter(true);
    const searchPromise = searchInverterForBuilding({
      search: e.target.value,
      buildingId: selectedOptionIdBuilding,
    });

    if (e.target.value.length < 1) {
      setSearchResult1Inverter(null);
      setSearchOnInverter(false);
      setSearchResultEmptyInverter(false);
    } else {
      if (searchPromise instanceof Promise) {
        searchPromise
          .then((data) => {
            if (data.length < 1) {
              setSearchResultEmptyInverter(true);
            } else {
              setSearchResultEmptyInverter(false);
              setSearchResult1Inverter(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleClickOutsideInverter = (event) => {
    if (
      dropdownRefInverter.current &&
      !dropdownRefInverter.current.contains(event.target)
    ) {
      setIsOpenInverter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideInverter);

    return () => {
      document.removeEventListener("click", handleClickOutsideInverter);
    };
  }, []);

  //default
  const [historicalDataForDefaultEnabled, setHistoricalDataForDefaultEnabled] = useState(false);
  const [historicalDataForDefault, setHistoricalDataForDefault] = useState(null);

  useQuery(
    ["historicalDataForDefault", firstProjectForDefaultViewId],
    () => getHistoricalDataForProject(firstProjectForDefaultViewId),
    {
      enabled: historicalDataForDefaultEnabled,
      onSuccess: (data) => {
        setHistoricalDataForDefaultEnabled(false);
        setHistoricalDataForDefault(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForDefaultEnabled(true);
  }, [firstProjectForDefaultViewId]);

  const [historicalDataForDefaultSunHrsBarChartDataEnabled, setHistoricalDataForDefaultSunHrsBarChartDataEnabled] = useState(false);
  const [historicalDataForDefaultSunHrsBarChartData, setHistoricalDataForDefaultSunHrsBarChartData] = useState(null);

  useQuery(
    ["historicalDataForDefaultSunHrsBarChartData", firstProjectForDefaultViewId],
    () => getHistoricalDataForProjectSunHrsBarChartData(firstProjectForDefaultViewId),
    {
      enabled: historicalDataForDefaultSunHrsBarChartDataEnabled,
      onSuccess: (data) => {
        setHistoricalDataForDefaultSunHrsBarChartDataEnabled(false);
        setHistoricalDataForDefaultSunHrsBarChartData(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForDefaultSunHrsBarChartDataEnabled(true);
  }, [firstProjectForDefaultViewId]);

  //project
  const [historicalDataForProjectEnabled, setHistoricalDataForProjectEnabled] = useState(false);
  const [historicalDataForProject, setHistoricalDataForProject] = useState(null);


  useQuery(
    ["historicalDataForProject", selectedOptionId],
    () => getHistoricalDataForProject(selectedOptionId),
    {
      enabled: historicalDataForProjectEnabled,
      onSuccess: (data) => {
        setHistoricalDataForProjectEnabled(false);
        setHistoricalDataForProject(data);
      }
    }
  );


  useEffect(() => {
    setHistoricalDataForProjectEnabled(true);
  }, [selectedOptionId]);

  const [historicalDataForProjectSunHrsBarChartDataEnabled, setHistoricalDataForProjectSunHrsBarChartDataEnabled] = useState(false);
  const [historicalDataForProjectSunHrsBarChartData, setHistoricalDataForProjectSunHrsBarChartData] = useState(null);

  useQuery(
    ["historicalDataForProjectSunHrsBarChartData", selectedOptionId],
    () => getHistoricalDataForProjectSunHrsBarChartData(selectedOptionId),
    {
      enabled: historicalDataForProjectSunHrsBarChartDataEnabled,
      onSuccess: (data) => {
        setHistoricalDataForProjectSunHrsBarChartDataEnabled(false);
        setHistoricalDataForProjectSunHrsBarChartData(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForProjectSunHrsBarChartDataEnabled(true);
  }, [selectedOptionId]);

  //company
  const [historicalDataForCompanyEnabled, setHistoricalDataForCompanyEnabled] = useState(false);
  const [historicalDataForCompany, setHistoricalDataForCompany] = useState(null);

  useQuery(
    ["historicalDataForCompany", selectedOptionIdCompany],
    () => getHistoricalDataForCompany(selectedOptionIdCompany),
    {
      enabled: historicalDataForCompanyEnabled,
      onSuccess: (data) => {
        setHistoricalDataForCompanyEnabled(false);
        setHistoricalDataForCompany(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForCompanyEnabled(true);
  }, [selectedOptionIdCompany]);

  const [historicalDataForCompanySunHrsBarChartDataEnabled, setHistoricalDataForCompanySunHrsBarChartDataEnabled] = useState(false);
  const [historicalDataForCompanySunHrsBarChartData, setHistoricalDataForCompanySunHrsBarChartData] = useState(null);

  useQuery(
    ["historicalDataForCompanySunHrsBarChartData", selectedOptionIdCompany],
    () => getHistoricalDataForCompanySunHrsBarChartData(selectedOptionIdCompany),
    {
      enabled: historicalDataForCompanySunHrsBarChartDataEnabled,
      onSuccess: (data) => {
        setHistoricalDataForCompanySunHrsBarChartDataEnabled(false);
        setHistoricalDataForCompanySunHrsBarChartData(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForCompanySunHrsBarChartDataEnabled(true);
  }, [selectedOptionIdCompany]);

  //building
  const [historicalDataForBuildingEnabled, setHistoricalDataForBuildingEnabled] = useState(false);
  const [historicalDataForBuilding, setHistoricalDataForBuilding] = useState(null);

  useQuery(
    ["historicalDataForBuilding", selectedOptionIdBuilding],
    () => getHistoricalDataForBuilding(selectedOptionIdBuilding),
    {
      enabled: historicalDataForBuildingEnabled,
      onSuccess: (data) => {
        setHistoricalDataForBuildingEnabled(false);
        setHistoricalDataForBuilding(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForBuildingEnabled(true);
  }, [selectedOptionIdBuilding]);

  const [historicalDataForBuildingSunHrsBarChartDataEnabled, setHistoricalDataForBuildingSunHrsBarChartDataEnabled] = useState(false);
  const [historicalDataForBuildingSunHrsBarChartData, setHistoricalDataForBuildingSunHrsBarChartData] = useState(null);

  useQuery(
    ["historicalDataForBuildingSunHrsBarChartData", selectedOptionIdBuilding],
    () => getHistoricalDataForBuildingSunHrsBarChartData(selectedOptionIdBuilding),
    {
      enabled: historicalDataForBuildingSunHrsBarChartDataEnabled,
      onSuccess: (data) => {
        setHistoricalDataForBuildingSunHrsBarChartDataEnabled(false);
        setHistoricalDataForBuildingSunHrsBarChartData(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForBuildingSunHrsBarChartDataEnabled(true);
  }, [selectedOptionIdBuilding]);

  //inverter
  const [historicalDataForInverterEnabled, setHistoricalDataForInverterEnabled] = useState(false);
  const [historicalDataForInverter, setHistoricalDataForInverter] = useState(null);

  useQuery(
    ["historicalDataForInverter", selectedOptionIdInverter],
    () => getHistoricalDataForInverter(selectedOptionIdInverter),
    {
      enabled: historicalDataForInverterEnabled,
      onSuccess: (data) => {
        setHistoricalDataForInverterEnabled(false);
        setHistoricalDataForInverter(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForInverterEnabled(true);
  }, [selectedOptionIdInverter]);

  const [historicalDataForInverterSunHrsBarChartDataEnabled, setHistoricalDataForInverterSunHrsBarChartDataEnabled] = useState(false);
  const [historicalDataForInverterSunHrsBarChartData, setHistoricalDataForInverterSunHrsBarChartData] = useState(null);

  useQuery(
    ["historicalDataForInverterSunHrsBarChartData", selectedOptionIdInverter],
    () => getHistoricalDataForInverterSunHrsBarChartData(selectedOptionIdInverter),
    {
      enabled: historicalDataForInverterSunHrsBarChartDataEnabled,
      onSuccess: (data) => {
        setHistoricalDataForInverterSunHrsBarChartDataEnabled(false);
        setHistoricalDataForInverterSunHrsBarChartData(data);
      }
    }
  );

  useEffect(() => {
    setHistoricalDataForInverterSunHrsBarChartDataEnabled(true);
  }, [selectedOptionIdInverter]);

  //main data
  const [mainHistoricalTableData, setMainHistoricalTableData] = useState(null);
  const [mainHistoricalSunHrsBarChartData, setMainHistoricalSunHrsBarChartData] = useState(null);

  useEffect(() => {
    if (selectedOptionId && !selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainHistoricalTableData(historicalDataForProject);
      setMainHistoricalSunHrsBarChartData(historicalDataForProjectSunHrsBarChartData);
    } else if (selectedOptionId && selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainHistoricalTableData(historicalDataForCompany);
      setMainHistoricalSunHrsBarChartData(historicalDataForCompanySunHrsBarChartData);
    } else if (selectedOptionId && selectedOptionIdCompany && selectedOptionIdBuilding && !selectedOptionIdInverter) {
      console.log("historicalDataForBuilding", historicalDataForBuilding);
      setMainHistoricalTableData(historicalDataForBuilding);
      setMainHistoricalSunHrsBarChartData(historicalDataForBuildingSunHrsBarChartData);
    } else if (selectedOptionId && selectedOptionIdCompany && selectedOptionIdBuilding && selectedOptionIdInverter) {
      setMainHistoricalTableData(historicalDataForInverter);
      setMainHistoricalSunHrsBarChartData(historicalDataForInverterSunHrsBarChartData);
    } else if (!selectedOptionId && !selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainHistoricalTableData(historicalDataForDefault);
      setMainHistoricalSunHrsBarChartData(historicalDataForDefaultSunHrsBarChartData);
    }
  }, [historicalDataForProject, historicalDataForProjectSunHrsBarChartData, historicalDataForCompany, historicalDataForCompanySunHrsBarChartData, selectedOptionId, selectedOptionIdCompany, historicalDataForBuilding, historicalDataForBuildingSunHrsBarChartData, selectedOptionIdBuilding, historicalDataForInverter, historicalDataForInverterSunHrsBarChartData, selectedOptionIdInverter, historicalDataForDefault, historicalDataForDefaultSunHrsBarChartData]);


  //impact data
  const [impactDataForDefaultEnabled, setImpactDataForDefaultEnabled] = useState(false);
  const [impactDataForDefault, setImpactDataForDefault] = useState(null);

  useQuery(
    ["impactDataForDefault", firstProjectForDefaultViewId],
    () => getImpactDataForProject(firstProjectForDefaultViewId),
    {
      enabled: impactDataForDefaultEnabled,
      onSuccess: (data) => {
        setImpactDataForDefaultEnabled(false);
        setImpactDataForDefault(data);
        console.log("impactDataForDefault", data);
      }
    }
  );

  useEffect(() => {
    setImpactDataForDefaultEnabled(true);
  }, [firstProjectForDefaultViewId]);

  const [impactDataForProjectEnabled, setImpactDataForProjectEnabled] = useState(false);
  const [impactDataForProject, setImpactDataForProject] = useState(null);

  useQuery(
    ["impactDataForProject", selectedOptionId],
    () => getImpactDataForProject(selectedOptionId),
    {
      enabled: impactDataForProjectEnabled,
      onSuccess: (data) => {
        setImpactDataForProjectEnabled(false);
        setImpactDataForProject(data);
      }
    }
  );

  useEffect(() => {
    setImpactDataForProjectEnabled(true);
  }, [selectedOptionId]);

  const [impactDataForCompanyEnabled, setImpactDataForCompanyEnabled] = useState(false);
  const [impactDataForCompany, setImpactDataForCompany] = useState(null);

  useQuery(
    ["impactDataForCompany", selectedOptionIdCompany],
    () => getImpactDataForCompany(selectedOptionIdCompany),
    {
      enabled: impactDataForCompanyEnabled,
      onSuccess: (data) => {
        setImpactDataForCompanyEnabled(false);
        setImpactDataForCompany(data);
      }
    }
  );

  useEffect(() => {
    setImpactDataForCompanyEnabled(true);
  }, [selectedOptionIdCompany]);

  const [impactDataForBuildingEnabled, setImpactDataForBuildingEnabled] = useState(false);
  const [impactDataForBuilding, setImpactDataForBuilding] = useState(null);

  useQuery(
    ["impactDataForBuilding", selectedOptionIdBuilding],
    () => getImpactDataForBuilding(selectedOptionIdBuilding),
    {
      enabled: impactDataForBuildingEnabled,
      onSuccess: (data) => {
        setImpactDataForBuildingEnabled(false);
        setImpactDataForBuilding(data);
      }
    }
  );

  useEffect(() => {
    setImpactDataForBuildingEnabled(true);
  }, [selectedOptionIdBuilding]);

  const [impactDataForInverterEnabled, setImpactDataForInverterEnabled] = useState(false);
  const [impactDataForInverter, setImpactDataForInverter] = useState(null);

  useQuery(
    ["impactDataForInverter", selectedOptionIdInverter],
    () => getImpactDataForInverter(selectedOptionIdInverter),
    {
      enabled: impactDataForInverterEnabled,
      onSuccess: (data) => {
        setImpactDataForInverterEnabled(false);
        setImpactDataForInverter(data);
      }
    }
  );

  useEffect(() => {
    setImpactDataForInverterEnabled(true);
  }, [selectedOptionIdInverter]);

  //main data
  const [mainImpactTableData, setMainImpactTableData] = useState(null);

  useEffect(() => {
    if (selectedOptionId && !selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainImpactTableData(impactDataForProject);
    } else if (selectedOptionId && selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainImpactTableData(impactDataForCompany);
    } else if (selectedOptionId && selectedOptionIdCompany && selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainImpactTableData(impactDataForBuilding);
    } else if (selectedOptionId && selectedOptionIdCompany && selectedOptionIdBuilding && selectedOptionIdInverter) {
      setMainImpactTableData(impactDataForInverter);
    } else if (!selectedOptionId && !selectedOptionIdCompany && !selectedOptionIdBuilding && !selectedOptionIdInverter) {
      setMainImpactTableData(impactDataForDefault);
    }
  }, [impactDataForProject, impactDataForCompany, impactDataForBuilding, impactDataForInverter, selectedOptionId, selectedOptionIdCompany, selectedOptionIdBuilding, selectedOptionIdInverter, impactDataForDefault]);
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-1.5">
        <div
          className={`flex items-center justify-start space-x-5 bg-[#25476A] rounded-md p-3.5 select-none`}
        >
          <div className="flex items-center space-x-3 select-none">
            <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
              Dashboard
            </h1>
          </div>
          <div className="space-x-2 md:space-x-5 flex items-center select-none">
            <div className="relative select-none" ref={dropdownRef}>
              <input
                type="text"
                className="w-36 p-1 px-2 pr-7 text-sm border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none cursor-pointer select-none"
                value={selectedOption}
                readOnly
                onClick={toggleDropdown}
              />
              <svg
                className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isOpen && (
                <ul className="absolute mt-0.5 py-0.5 w-full bg-gray-100 border border-gray-300 rounded-md z-50">
                  <li className="px-2 p-1">
                    <input
                      type="text"
                      // value={inputValue}
                      onChange={handleProjectSearch}
                      className="border border-gray-300 w-full p-1 text-sm rounded-md"
                      placeholder="Search..."
                    />
                  </li>
                  {!searchResultEmpty &&
                    searchResult1?.length > 0 &&
                    searchOn &&
                    searchResult1.map((option) => (
                      <li
                        key={option.id}
                        className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                        onClick={() => selectOption(option?.id, option?.name)}
                      >
                        {option?.name}
                      </li>
                    ))}
                  {!searchResultEmpty &&
                    !searchOn &&
                    allProject?.map((option) => (
                      <li
                        key={option.id}
                        className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                        onClick={() => selectOption(option?.id, option?.name)}
                      >
                        {option?.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            {selectedOptionId !== null && (
              <div className="relative select-none" ref={dropdownRefCompany}>
                <input
                  type="text"
                  className="w-36 p-1 px-2 pr-7 text-sm border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none cursor-pointer select-none"
                  value={selectedOptionCompany}
                  readOnly
                  onClick={toggleDropdownCompany}
                />
                <svg
                  className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {isOpenCompany && (
                  <ul className="absolute mt-0.5 py-0.5 w-full bg-gray-100 border border-gray-300 rounded-md z-50">
                    <li className="px-2 p-1">
                      <input
                        type="text"
                        // value={inputValue}
                        onChange={handleCompanySearch}
                        className="border border-gray-300 w-full p-1 text-sm rounded-md"
                        placeholder="Search..."
                      />
                    </li>
                    {!searchResultEmptyCompany &&
                      searchResult1Company?.length > 0 &&
                      searchOnCompany &&
                      searchResult1Company.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionCompany(option?.id, option?.name)
                          }
                        >
                          {option?.name}
                        </li>
                      ))}
                    {!searchResultEmptyCompany &&
                      !searchOnCompany &&
                      project?.data?.companies?.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionCompany(option?.id, option?.name)
                          }
                        >
                          {option?.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
            {selectedOptionIdCompany !== null && (
              <div className="relative select-none" ref={dropdownRefBuilding}>
                <input
                  type="text"
                  className="w-36 p-1 px-2 pr-7 text-sm border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none cursor-pointer select-none"
                  value={selectedOptionBuilding}
                  readOnly
                  onClick={toggleDropdownBuilding}
                />
                <svg
                  className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {isOpenBuilding && (
                  <ul className="absolute mt-0.5 py-0.5 w-full bg-gray-100 border border-gray-300 rounded-md z-50">
                    <li className="px-2 p-1">
                      <input
                        type="text"
                        // value={inputValue}
                        onChange={handleBuildingSearch}
                        className="border border-gray-300 w-full p-1 text-sm rounded-md"
                        placeholder="Search..."
                      />
                    </li>
                    {!searchResultEmptyBuilding &&
                      searchResult1Building?.length > 0 &&
                      searchOnBuilding &&
                      searchResult1Building.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionBuilding(option?.id, option?.name)
                          }
                        >
                          {option?.name}
                        </li>
                      ))}
                    {!searchResultEmptyBuilding &&
                      !searchOnBuilding &&
                      company?.data?.buildings?.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionBuilding(option?.id, option?.name)
                          }
                        >
                          {option?.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
            {selectedOptionIdBuilding !== null && (
              <div className="relative select-none" ref={dropdownRefInverter}>
                <input
                  type="text"
                  className="w-36 p-1 px-2 pr-7 text-sm border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none cursor-pointer select-none"
                  value={selectedOptionInverter}
                  readOnly
                  onClick={toggleDropdownInverter}
                />
                <svg
                  className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {isOpenInverter && (
                  <ul className="absolute mt-0.5 py-0.5 w-full bg-gray-100 border border-gray-300 rounded-md z-50">
                    <li className="px-2 p-1">
                      <input
                        type="text"
                        // value={inputValue}
                        onChange={handleInverterSearch}
                        className="border border-gray-300 w-full p-1 text-sm rounded-md"
                        placeholder="Search..."
                      />
                    </li>
                    {!searchResultEmptyInverter &&
                      searchResult1Inverter?.length > 0 &&
                      searchOnInverter &&
                      searchResult1Inverter.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionInverter(option?.id, option?.deviceSn)
                          }
                        >
                          {option?.deviceSn}
                        </li>
                      ))}
                    {!searchResultEmptyInverter &&
                      !searchOnInverter &&
                      building?.data?.inverters?.map((option) => (
                        <li
                          key={option.id}
                          className="px-2 p-1 border-t cursor-pointer hover:bg-gray-100 text-sm w-full truncate"
                          onClick={() =>
                            selectOptionInverter(option?.id, option?.deviceSn)
                          }
                        >
                          {option?.deviceSn}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
            {/* <select
              className="w-36 p-1 border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Project" selected disabled>
                Project
              </option>
              <option value="ADMIN">Admin</option>
              <option value="ENGINEER">Engineer</option>
              <option value="USER">User</option>
            </select>
            <select
              className="w-36 p-1 border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Company" selected disabled>
                Company
              </option>
              <option value="ADMIN">Admin</option>
              <option value="ENGINEER">Engineer</option>
              <option value="USER">User</option>
            </select>
            <select
              className="w-36 p-1 border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Building" selected disabled>
                Building
              </option>
              <option value="ADMIN">Admin</option>
              <option value="ENGINEER">Engineer</option>
              <option value="USER">User</option>
            </select> */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <DailyView />
          <LivePowerFlow />
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          <div className="col-span-4">
            <Historical historicalDataForProject={mainHistoricalTableData} historicalDataForProjectSunHrsBarChartData={mainHistoricalSunHrsBarChartData} />
          </div>
          <div className="col-span-2">
            <Impact impactData={mainImpactTableData} />
          </div>
        </div>
      </div>
    </>
  );
}
