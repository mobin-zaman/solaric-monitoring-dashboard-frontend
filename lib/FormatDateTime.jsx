function formatDate({ dateString }) {
  const date = new Date(dateString);
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const dateTimeStr = date.toLocaleTimeString("en-US", options);

  return date === "Invalid Date"
    ? ""
    : `${dateTimeStr.slice(0, -14)} & ${dateTimeStr.slice(-11)}`;
}

export default formatDate;