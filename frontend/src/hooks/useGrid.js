export default function useGrid(showFactor) {
  const GRID_SIZE = 9;
  const SUBGRID_SIZE = 3;

  const solvedGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  const showGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );

  function isValid(row, col, value) {
    for (let i = 0; i < GRID_SIZE; i++) {
      if (solvedGrid[row][i] === value || solvedGrid[i][col] === value)
        return false;
    }

    const startRow = Math.floor(row / SUBGRID_SIZE) * SUBGRID_SIZE;
    const startCol = Math.floor(col / SUBGRID_SIZE) * SUBGRID_SIZE;

    for (let i = 0; i < SUBGRID_SIZE; i++) {
      for (let j = 0; j < SUBGRID_SIZE; j++) {
        if (solvedGrid[startRow + i][startCol + j] === value) return false;
      }
    }

    return true;
  }

  function solve(row = 0, col = 0) {
    if (row === GRID_SIZE) return true;
    if (col === GRID_SIZE) return solve(row + 1, 0);

    if (solvedGrid[row][col] !== 0) return solve(row, col + 1);

    for (let value = 1; value <= GRID_SIZE; value++) {
      if (isValid(row, col, value)) {
        solvedGrid[row][col] = value;

        if (Math.random() <= showFactor) {
          showGrid[row][col] = value;
        }

        if (solve(row, col + 1)) return true;

        solvedGrid[row][col] = 0;
        showGrid[row][col] = 0;
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
