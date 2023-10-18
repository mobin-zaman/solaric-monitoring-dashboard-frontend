import React from "react";

const RadioItem = ({ id, name, selected, label, setSelected }) => {
  return (
    <label htmlFor={id}>
      <div className="flex items-center gap-2">
        <input
          onChange={() => setSelected(id)}
          type="radio"
          id={id}
          name={name}
          className="radio"
          checked={id === selected}
        />
        <p> {label}</p>
      </div>
    </label>
  );
};

export default RadioItem;
