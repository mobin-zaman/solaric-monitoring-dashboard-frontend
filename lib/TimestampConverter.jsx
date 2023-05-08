import React from "react";

function TimestampConverter({ timestamp }) {
  const date = new Date(timestamp * 1000);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateString = date.toLocaleDateString("en-US", options);
  const timeString = date.toLocaleTimeString("en-US", { hour12: true });
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <div className="flex justify-center">{timeString}</div>
      <div className="flex justify-center">{dateString}</div>
    </div>
  );
}

export default TimestampConverter;
