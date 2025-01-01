import gridStyles from "../styles/componentStyles/grid.module.css";
import { useContext, useEffect, useState } from "react";
import { OptionsContext } from "../gameAssest/Options";

export default function Grid() {
  const {
    unsolved: [grid, setGrid],
    solved,
    mistake: [, setMistakeCount],
    hint: [hints],
    value: [values],
    remaining: [remainings, setRemainings],
    activeCell: [activeCells, setActiveCells],
  } = useContext(OptionsContext);
  const [rowColorBox, setRowColorBox] = useState(Array(9).fill(false));
  const [colColorBox, setColColorBox] = useState(Array(9).fill(false));
  const [boxColorBox, setBoxColorBox] = useState(Array(9).fill(false));
  const [valueColor, setValueColor] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [sameValueBox, setSameValueBox] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [wrongBox, setWrongBox] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  useEffect(() => {
    setValueColor(
      grid.map((row) => row.map((value) => (value !== 0 ? "#344861" : "")))
    );
    setRemainings((prevState) => {
      const newRemainings = prevState.map((_, idx) => {
        const count = grid.flat().filter((value) => value === idx).length;
        return idx ? 9 - count : 81 - count;
      });
      return newRemainings;
    });
  }, [solved]);

  const sameValues = (inputValue) => {
    setSameValueBox(() =>
      grid.map((row) =>
        row.map((value) => (value == inputValue ? true : false))
      )
    );
  };

  useEffect(() => {
    setActiveCells({ row: null, col: null });
    setRowColorBox(Array(9).fill(false));
    setColColorBox(Array(9).fill(false));
    setBoxColorBox(Array(9).fill(false));
    values
      ? sameValues(values)
      : setSameValueBox(Array.from({ length: 9 }, () => Array(9).fill(false)));
  }, [values]);

  const highlight = (rowIdx, colIdx, boxIdx) => {
    setActiveCells({ row: rowIdx, col: colIdx });
    setRowColorBox((prevState) =>
      prevState.map((_, idx) => (idx === rowIdx ? true : false))
    );
    setColColorBox((prevState) =>
      prevState.map((_, idx) => (idx === colIdx ? true : false))
    );
    setBoxColorBox((prevState) =>
      prevState.map((_, idx) => (idx === boxIdx ? true : false))
    );
  };

  const justOneNum = (inputValue, rowIdx, colIdx) => {
    if (inputValue === undefined && grid[rowIdx][colIdx] !== 0) {
      const currentValue = grid[rowIdx][colIdx];
      setWrongBox((prevState) => {
        const newWrongBox = prevState.map((row) => [...row]);
        const affectedCells = new Set();
        for (let i = 0; i < 9; i++) {
          if (grid[rowIdx][i] === currentValue)
            affectedCells.add(`${rowIdx},${i}`);
          if (grid[i][colIdx] === currentValue)
            affectedCells.add(`${i},${colIdx}`);
        }
        const startRow = Math.floor(rowIdx / 3) * 3;
        const startCol = Math.floor(colIdx / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
          for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === currentValue) affectedCells.add(`${i},${j}`);
          }
        }
        affectedCells.forEach((cell) => {
          const [r, c] = cell.split(",").map(Number);
          newWrongBox[r][c]--;
        });
        newWrongBox[rowIdx][colIdx] = 0;
        return newWrongBox;
      });
      setGrid((prevState) => {
        const newGrid = prevState.map((row) => [...row]);
        newGrid[rowIdx][colIdx] = 0;
        return newGrid;
      });
      setSameValueBox(Array.from({ length: 9 }, () => Array(9).fill(false)));
      return;
    }
    if (/^[1-9]?$/.test(inputValue)) {
      const num = Number(inputValue);
      if (remainings[num] === 0) {
        alert(`There are already 9 ${num}s in the grid`);
        return;
      }
      if (grid[rowIdx][colIdx] !== num) {
        sameValues(num);
        if (num !== solved[rowIdx][colIdx]) {
          setMistakeCount((prevState) => prevState + 1);
          setValueColor((prevState) => {
            const newValueColor = prevState.map((row) => [...row]);
            newValueColor[rowIdx][colIdx] = "red";
            return newValueColor;
          });
          setWrongBox((prevState) => {
            const newWrongBox = prevState.map((row) => [...row]);
            const affectedCells = new Set();
            for (let i = 0; i < 9; i++) {
              if (grid[rowIdx][i] === num) affectedCells.add(`${rowIdx},${i}`);
              if (grid[i][colIdx] === num) affectedCells.add(`${i},${colIdx}`);
            }
            const startRow = Math.floor(rowIdx / 3) * 3;
            const startCol = Math.floor(colIdx / 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
              for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) affectedCells.add(`${i},${j}`);
              }
            }
            affectedCells.forEach((cell) => {
              const [r, c] = cell.split(",").map(Number);
              newWrongBox[r][c]++;
            });
            newWrongBox[rowIdx][colIdx] = 1;
            return newWrongBox;
          });
        } else {
          setRemainings((prevState) => {
            prevState[num]--;
            prevState[0]--;
            return [...prevState];
          });
          setValueColor((prevState) => {
            const newValueColor = prevState.map((row) => [...row]);
            newValueColor[rowIdx][colIdx] = "#325aaf";
            return newValueColor;
          });
          setWrongBox((prevState) => {
            const newWrongBox = prevState.map((row) => [...row]);
            const affectedCells = new Set();
            for (let i = 0; i < 9; i++) {
              if (grid[rowIdx][i] === num) affectedCells.add(`${rowIdx},${i}`);
              if (grid[i][colIdx] === num) affectedCells.add(`${i},${colIdx}`);
            }
            const startRow = Math.floor(rowIdx / 3) * 3;
            const startCol = Math.floor(colIdx / 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
              for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) affectedCells.add(`${i},${j}`);
              }
            }
            affectedCells.forEach(() => newWrongBox[rowIdx][colIdx]++);
            return newWrongBox;
          });
        }
        setGrid((prevState) => {
          const newGrid = prevState.map((row) => [...row]);
          newGrid[rowIdx][colIdx] = num || 0;
          return newGrid;
        });
      }
    } else {
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (hints) {
      highlight(
        hints[0]-1,
        hints[1]-1,
        Math.floor((hints[0]-1) / 3) * 3 + Math.floor((hints[1]-1) / 3)
      );
      justOneNum(hints[2], hints[0]-1, hints[1]-1);
    }
  }, [hints]);

  return (
    <div className={gridStyles.outlineBorder}>
      {grid.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`${gridStyles[`row${rowIdx + 1}`]} ${gridStyles.row}`}
        >
          {row.map((gridValue, colIdx) => {
            const boxIdx = Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3);
            const bgColor = wrongBox[rowIdx][colIdx]
              ? "pink"
              : activeCells.row === rowIdx && activeCells.col === colIdx
              ? "#bbdefb"
              : rowColorBox[rowIdx] ||
                colColorBox[colIdx] ||
                boxColorBox[boxIdx] ||
                sameValueBox[rowIdx][colIdx]
              ? "#e2ebf3"
              : "";
            return (
              <div
                key={colIdx}
                className={`${gridStyles.valueContainer} ${
                  gridStyles[`col${colIdx + 1}`]
                }`}
                onClick={() => {
                  highlight(rowIdx, colIdx, boxIdx);
                  grid[rowIdx][colIdx] !== solved[rowIdx][colIdx]
                    ? values
                      ? justOneNum(values, rowIdx, colIdx)
                      : grid[rowIdx][colIdx]
                      ? sameValues(grid[rowIdx][colIdx])
                      : setSameValueBox(
                          Array.from({ length: 9 }, () => Array(9).fill(false))
                        )
                    : sameValues(grid[rowIdx][colIdx]);
                }}
                onBlur={() => {
                  setRowColorBox(Array(9).fill(false));
                  setColColorBox(Array(9).fill(false));
                  setBoxColorBox(Array(9).fill(false));
                  setSameValueBox(
                    Array.from({ length: 9 }, () => Array(9).fill(false))
                  );
                  setActiveCells({ row: null, col: null });
                }}
                tabIndex={1}
                style={{
                  backgroundColor: bgColor,
                  color: valueColor[rowIdx][colIdx],
                }}
              >
                {gridValue !== 0 && gridValue === solved[rowIdx][colIdx] ? (
                  gridValue
                ) : (
                  <input
                    type="text"
                    className={`${gridStyles.gridField}`}
                    value={gridValue || ""}
                    onInput={(e) =>
                      justOneNum(e.target.value.at(-1), rowIdx, colIdx)
                    }
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
