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
  getHistoricalDataForProject
} from "@/lib/Helper";

export default function Index() {
  //project dropdown

  const {
    data: allProject,
    isLoading,
    isError,
    refetch,
  } = useQuery("projects", () => getProjects(), {
    enabled: true, //enable query
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Project");
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
                className="w-36 p-1 px-2 pr-7 text-sm border border-[#168636] rounded-md ring-0 focus:ring-0 focus:outline-none cursor-pointer"
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
            <Historical historicalDataForProject={historicalDataForProject} />
          </div>
          <div className="col-span-2">
            <Impact />
          </div>
        </div>
      </div>
    </>
  );
}
