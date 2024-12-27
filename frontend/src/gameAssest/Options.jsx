import { createContext, useEffect, useState } from "react";
import useGrid from "../hooks/useGrid";

export const OptionsContext = createContext();

export default function OptionsContextProvider({ children }) {
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [solvedGrid, setSolvedGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(false);

  useEffect(() => {
    const { unsolved, solved } = useGrid();
    setGrid(unsolved);
    setSolvedGrid(solved);
  }, []);

  const contextValue = {
    unsolved: [grid, setGrid],
    solved: solvedGrid,
    mistake: [mistakes, setMistakes],
    hint: [hints, setHints],
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {children}
    </OptionsContext.Provider>
  );
}
