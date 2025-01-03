import { createContext, useEffect, useState } from "react";
import useGrid from "../hooks/useGrid";

export const OptionsContext = createContext();

export default function OptionsContextProvider({ children }) {
  const [grid, setGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [solvedGrid, setSolvedGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [notes,setNotes] = useState(false); 
  const [mistakeCount, setMistakeCount] = useState(0);
  const [hints, setHints] = useState(null);
  const [values, setValues] = useState(0);
  const [remainings, setRemainings] = useState(Array(10).fill(0));
  const [activeCells, setActiveCells] = useState({
    row: null,
    col: null,
  });

  useEffect(() => {
    const { unsolved, solved } = useGrid();
    setGrid(unsolved);
    setSolvedGrid(solved);
  }, []);

  const contextValue = {
    unsolved: [grid, setGrid],
    solved: solvedGrid,
    mistake: [mistakeCount, setMistakeCount],
    hint: [hints, setHints],
    value: [values, setValues],
    remaining: [remainings, setRemainings],
    activeCell: [activeCells, setActiveCells],
    note: [notes, setNotes],
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {children}
    </OptionsContext.Provider>
  );
}
