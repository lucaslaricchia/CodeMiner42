import React, { useState } from "react";

import "./styles.css";

export default function NumberInput() {
  const [value, setValue] = useState(0);

  return (
    <div className="wrapper">
      <button
        onSubmit={false}
        onClick={() => {
          if (value < 1) {
            setValue(0);
          } else {
            setValue(value - 1);
          }
        }}
      >
        -
      </button>
      <input
        value={value}
        type="number"
        onChange={(e) => setValue(parseInt(e.target.value))}
        min="0"
        max="999"
      ></input>
      <button
        onSubmit={false}
        onClick={() => {
          if (value > 98) {
            setValue(99);
          } else {
            setValue(value + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
}
