import { useState} from "react";
import GameComponents from "./GameComponents";
import GameAttributes from "./GameAttributes";
import useGrid from "../hooks/useGrid";
import gridStyles from "../styles/componentStyles/grid.module.css";

export default function Grid() {
  const { unsolved, solved } = useGrid();
  const [grid, setGrid] = useState(unsolved);
  const [mistakes, setMistakes] = useState(0);
  const [hint, setHint] = useState(false);

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
        inputValue !== solved[rowIdx][colIdx] &&
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
      <GameComponents mistakeCount={mistakes} />
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
      <GameAttributes getHint={setHint} />
    </>
  );
}
