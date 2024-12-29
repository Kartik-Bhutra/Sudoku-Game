import gridStyles from "../styles/componentStyles/grid.module.css";
import { useContext, useEffect, useState } from "react";
import { OptionsContext } from "../gameAssest/Options";

export default function Grid() {
  const {
    unsolved: [grid, setGrid],
    solved,
    mistake: [, setMistakes],
    hint: [hints],
  } = useContext(OptionsContext);
  const [rowColorBox, setRowColorBox] = useState(Array(9).fill(""));
  const [colColorBox, setColColorBox] = useState(Array(9).fill(""));
  const [boxColorBox, setBoxColorBox] = useState(Array(9).fill(""));
  const [valueColor, setValueColor] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );
  const [sameValueBox, setSameValueBox] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

  useEffect(() => {
    setValueColor(
      grid.map((row, rowIdx) =>
        row.map((value, colIdx) =>
          value === grid[rowIdx][colIdx] ? "defaultBox" : ""
        )
      )
    );
  }, [solved]);

  const highlight = (rowIdx, colIdx, boxIdx) => {
    setRowColorBox((prevState) =>
      prevState.map((_, idx) => (idx === rowIdx ? "sameBox" : ""))
    );
    setColColorBox((prevState) =>
      prevState.map((_, idx) => (idx === colIdx ? "sameBox" : ""))
    );
    setBoxColorBox((prevState) =>
      prevState.map((_, idx) => (idx === boxIdx ? "sameBox" : ""))
    );
    if (grid[rowIdx][colIdx] !== 0) {
      setSameValueBox(() =>
        grid.map((row) =>
          row.map((value) => (value === grid[rowIdx][colIdx] ? "sameBox" : ""))
        )
      );
    }
  };

  const justOneNum = (e, rowIdx, colIdx) => {
    const inputValue = e.target.value.at(-1);
    if (inputValue === undefined && grid[rowIdx][colIdx] !== 0) {
      setGrid((prevState) => {
        prevState[rowIdx][colIdx] = 0;
        return [...prevState];
      });

    }
    if (/^[1-9]?$/.test(inputValue)) {
      if (grid[rowIdx][colIdx] != inputValue) {
        if (inputValue != solved[rowIdx][colIdx]) {
          setMistakes((prevState) => prevState + 1);
          setValueColor((prevState) => {
            prevState[rowIdx][colIdx] = "wrongBox";
            return [...prevState];
          });
          setSameValueBox((prevState) =>
            prevState.map((row, rowIdx) =>
              row.map((_, colIdx) =>
                grid[rowIdx][colIdx] == inputValue ? "sameWrongBox" : ""
              )
            )
          );
        } else {
          setValueColor((prevState) => {
            prevState[rowIdx][colIdx] = "correctBox";
            return [...prevState];
          });
          setSameValueBox((prevState) =>
            prevState.map((row, rowIdx) =>
              row.map((_, colIdx) =>
                grid[rowIdx][colIdx] == inputValue ? "sameCorrectBox" : ""
              )
            )
          );
        }
        setGrid((prevState) => {
          prevState[rowIdx][colIdx] =
            inputValue === "" ? 0 : Number(inputValue);
          return [...prevState];
        });
      }
    } else {
      e.target.value = "";
    }
  };

  return (
    <div className={gridStyles.outlineBorder}>
      {grid.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`${gridStyles[`row${rowIdx + 1}`]} ${gridStyles.row}`}
        >
          {row.map((gridValue, colIdx) => {
            const boxIdx = Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3);
            return (
              <div
                key={colIdx}
                className={`${gridStyles.valueContainer} ${
                  gridStyles[`col${colIdx + 1}`]
                }  ${gridStyles[colColorBox[colIdx]]} ${
                  gridStyles[rowColorBox[rowIdx]]
                } ${gridStyles[boxColorBox[boxIdx]]} ${
                  gridStyles[valueColor[rowIdx][colIdx]]
                } ${gridStyles[sameValueBox[rowIdx][colIdx]]}
                `}
                onClick={() => highlight(rowIdx, colIdx, boxIdx)}
              >
                {gridValue !== 0 && gridValue === solved[rowIdx][colIdx] ? (
                  gridValue
                ) : (
                  <input
                    type="text"
                    className={`${gridStyles.gridField}`}
                    value={gridValue || ""}
                    onInput={(e) => justOneNum(e, rowIdx, colIdx)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
