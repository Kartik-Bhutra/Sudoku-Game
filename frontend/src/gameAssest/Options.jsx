import { createContext, useEffect, useState } from "react";
import useGrid from "../hooks/useGrid";

export const OptionsContext = createContext();

export default function OptionsContextProvider({ children }) {
  const defaultGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [grid, setGrid] = useState(defaultGrid);
  const [solvedGrid, setSolvedGrid] = useState(defaultGrid);
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
