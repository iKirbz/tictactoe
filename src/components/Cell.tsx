import React, { useState } from "react";
import "./Cell.css";

export enum CellValue {
  X = "X",
  O = "O",
  Empty = "",
}

function Cell({
  index,
  value,
  handleClick,
}: {
  index: number;
  value: CellValue;
  handleClick: (index: number) => void;
}) {
  return (
    <button className="cell" onClick={() => handleClick(index)}>
      <div className="content">{value}</div>
    </button>
  );
}

export default Cell;
