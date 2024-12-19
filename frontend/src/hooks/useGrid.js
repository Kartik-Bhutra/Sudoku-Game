export default function useGrid(showFactor) {
  const GRID_SIZE = 9;
  const SUBGRID_SIZE = 3;

  const solvedGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  const showGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );

  function isValid(rowIdx, colIdx, value) {
    for (let i = 0; i < GRID_SIZE; i++) {
      if (solvedGrid[rowIdx][i] === value || solvedGrid[i][colIdx] === value)
        return false;
    }

    const startRow = Math.floor(rowIdx / SUBGRID_SIZE) * SUBGRID_SIZE;
    const startCol = Math.floor(colIdx / SUBGRID_SIZE) * SUBGRID_SIZE;

    for (let i = 0; i < SUBGRID_SIZE; i++) {
      for (let j = 0; j < SUBGRID_SIZE; j++) {
        if (solvedGrid[startRow + i][startCol + j] === value) return false;
      }
    }

    return true;
  }

  function solve(rowIdx = 0, colIdx = 0) {
    if (rowIdx === GRID_SIZE) return true;
    if (colIdx === GRID_SIZE) return solve(rowIdx + 1, 0);

    if (solvedGrid[rowIdx][colIdx] !== 0) return solve(rowIdx, colIdx + 1);

    for (let value = 1; value <= GRID_SIZE; value++) {
      if (isValid(rowIdx, colIdx, value)) {
        solvedGrid[rowIdx][colIdx] = value;

        if (Math.random() <= showFactor) {
          showGrid[rowIdx][colIdx] = value;
        }

        if (solve(rowIdx, colIdx + 1)) return true;

        solvedGrid[rowIdx][colIdx] = 0;
        showGrid[rowIdx][colIdx] = 0;
      }
    }

    return false;
  }

  return {
    generateGrid: () => {
      solve();
      return { solvedGrid, showGrid};
    },
  };
}
