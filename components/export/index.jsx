import React, { useState } from "react";
import RadioItem from "./RadioItem";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Export = () => {
  const [reportType, setReportType] = useState("");
  const [entity, setEntity] = useState("");
  const [between, setBetween] = useState("");
  const [outputType, setOutputType] = useState("");
  const [timeType, setTimeType] = useState("");
  const [yearValue, setYearValue] = useState(null);
  const [monthValue, setMonthValue] = useState(null);
  const [dailyValue, setDailyValue] = useState(null);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <div className="bg-white p-4 my-3 text-black rounded">
          <p className="border-b mb-5">Select Report Type</p>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="p-2 bg-white text-black px-20 border"
            placeholder="Select Report type"
          >
            <option>Generation</option>
            <option>Sun-Hrs</option>
            <option>Generation Comparison</option>
            <option>Sun-hrs Comparison</option>
            <option>$ Savings</option>
            <option>CO2 Savings</option>
            <option>Trees Savings</option>
          </select>
        </div>
        <div className="bg-white p-4 my-3 text-black rounded">
          <p className="border-b mb-5">Select Entity</p>
          <div className="flex gap-4">
            <RadioItem
              selected={entity}
              id="entityProjects"
              label={"Projects"}
              name="entity"
              setSelected={setEntity}
            />
            <RadioItem
              selected={entity}
              label={"Company"}
              id="entityCompany"
              name="entity"
              setSelected={setEntity}
            />
            <RadioItem
              selected={entity}
              label={"Building"}
              id="entityBuilding"
              name="entity"
              setSelected={setEntity}
            />
          </div>
          <p className="border-b my-5">Between</p>
          <div className="flex gap-4">
            <RadioItem
              selected={between}
              id="betweenProjects"
              label={"Projects"}
              name="between"
              setSelected={setBetween}
            />
            <RadioItem
              selected={between}
              label={"Company"}
              id="betweenCompany"
              name="between"
              setSelected={setBetween}
            />
            <RadioItem
              selected={between}
              label={"Building"}
              id="betweenBuilding"
              name="between"
              setSelected={setBetween}
            />
          </div>
        </div>

        <div className="bg-white p-4 my-3 text-black rounded">
          <p className="border-b mb-5">Select time</p>
          <div className="flex gap-4">
            <RadioItem
              selected={timeType}
              id="Yearly"
              label={"Yearly"}
              name="timeType"
              setSelected={setTimeType}
            />
            <RadioItem
              selected={timeType}
              label={"Monthly"}
              id="Monthly"
              name="timeType"
              setSelected={setTimeType}
            />
            <RadioItem
              selected={timeType}
              label={"Daily"}
              id="Daily"
              name="timeType"
              setSelected={setTimeType}
            />
          </div>
          <div className="my-2.5 p-2 flex justify-center items-center">
            {timeType === "Yearly" && (
              <ReactDatePicker
                className="bg-white text-black border w-full p-2 rounded"
                dateFormat="yyyy"
                showYearPicker
                selected={yearValue}
                placeholderText="Select year"
                onChange={(date) => setYearValue(date)}
              />
            )}
            {timeType === "Monthly" && (
              <ReactDatePicker
                className="bg-white text-black border w-full p-2 rounded"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                selected={monthValue}
                placeholderText="Select month"
                onChange={(date) => setMonthValue(date)}
              />
            )}
            {timeType === "Daily" && (
              <ReactDatePicker
                className="bg-white text-black border w-full p-2 rounded"
                selected={dailyValue}
                placeholderText="Select date"
                onChange={(date) => setDailyValue(date)}
              />
            )}
          </div>
        </div>

        <div className="bg-white p-4 my-3 text-black rounded">
          <p className="border-b mb-5">Select Output Type</p>
          <div className="flex gap-4">
            <RadioItem
              selected={outputType}
              id="Tabular"
              label={"Tabular"}
              name="outputType"
              setSelected={setOutputType}
            />
            <RadioItem
              selected={outputType}
              label={"Bar Chart"}
              id="barChart"
              name="outputType"
              setSelected={setOutputType}
            />
            <RadioItem
              selected={outputType}
              label={"Line Chart"}
              id="lineChart"
              name="outputType"
              setSelected={setOutputType}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn btn-info">Create</button>
        <button className="btn btn-error">Clear all</button>
      </div>
    </div>
  );
};

export default Export;
