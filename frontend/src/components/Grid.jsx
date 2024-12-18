import { useState } from "react";
import useGrid from "../hooks/useGrid";
import gridStyle from "../styles/grid.module.css";

export default function Grid() {
  const { generateGrid } = useGrid(0.9);
  const { showGrid, solvedGrid } = generateGrid();
  const [gridState, setGridState] = useState(showGrid);

  const justOneNum = (e, rowIdx, colIdx) => {
    const inputValue = e.target.value.at(-1);
    console.log(inputValue);

    if (/^[1-9]?$/.test(inputValue)) {
      setGridState((prevState) => {
        prevState[rowIdx][colIdx] = inputValue === "" ? 0 : Number(inputValue);
        return [...prevState];
      });
    } else {
      e.target.value = "";
    }
  };

  return (
    <div>
      {gridState.map((row, rowIdx) => (
        <div key={rowIdx} className={gridStyle.row}>
          {row.map((gridValue, colIdx) => (
            <div key={colIdx} className={gridStyle.valueContainer}>
              {gridValue !== 0 && gridValue === solvedGrid[rowIdx][colIdx] ? (
                gridValue
              ) : (
                <input
                  type="text"
                  className={gridStyle.gridField}
                  value={gridValue ? gridValue : ""}
                  onInput={(e) => justOneNum(e, rowIdx, colIdx)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
