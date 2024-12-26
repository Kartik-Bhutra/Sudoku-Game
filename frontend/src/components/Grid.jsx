import gridStyles from "../styles/componentStyles/grid.module.css";
import { useContext } from "react";
import {OptionsContext}  from "../gameAssest/Options";

export default function Grid() {
  const [grid, setGrid] = useContext(OptionsContext).unsolved;
  const solved = useContext(OptionsContext).solved;
  const [mistakes, setMistakes] = useContext(OptionsContext).mistake;
  const [hints, setHints] = useContext(OptionsContext).hint;

  const justOneNum = (e, rowIdx, colIdx) => {
    const inputValue = e.target.value.at(-1);
    if (inputValue === undefined && grid[rowIdx][colIdx] !== 0) {
      setGrid((prevState) => {
        prevState[rowIdx][colIdx] = 0;
        return [...prevState];
      });
    }
    if (/^[1-9]?$/.test(inputValue)) {
      if (
        inputValue != solved[rowIdx][colIdx] &&
        grid[rowIdx][colIdx] != inputValue
      ) {
        setMistakes((prevState) => prevState + 1);
      }
      setGrid((prevState) => {
        prevState[rowIdx][colIdx] = inputValue === "" ? 0 : Number(inputValue);
        return [...prevState];
      });
    } else {
      e.target.value = "";
    }
  };

  return (
    <>
      <div className={gridStyles.outlineBorder}>
        {grid.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`${gridStyles[`row${rowIdx + 1}`]} ${gridStyles.row}`}
          >
            {row.map((gridValue, colIdx) => (
              <div
                key={colIdx}
                className={`${gridStyles.valueContainer} ${
                  gridStyles[`col${colIdx + 1}`]
                }`}
              >
                {gridValue !== 0 && gridValue === solved[rowIdx][colIdx] ? (
                  gridValue
                ) : (
                  <input
                    type="text"
                    className={gridStyles.gridField}
                    value={gridValue || ""}
                    onInput={(e) => justOneNum(e, rowIdx, colIdx)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
