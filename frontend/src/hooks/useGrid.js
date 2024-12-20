export default function useGrid() {
  const unsolved = generateSudoku();
  const solved = solve([...unsolved.map((row) => [...row])]);
  return { unsolved, solved };
}

function generateSudoku(difficulty = "easy  ") {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const candidates = getAllowedNumbers(grid, row, col);
          for (const value of candidates) {
            grid[row][col] = value;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
          }
          return false;
        }
      }
    }
    return true;
  }

  function getAllowedNumbers(grid, row, col) {
    const usedNumbers = new Set();

    for (let c = 0; c < 9; c++) {
      if (grid[row][c] !== 0) usedNumbers.add(grid[row][c]);
    }

    for (let r = 0; r < 9; r++) {
      if (grid[r][col] !== 0) usedNumbers.add(grid[r][col]);
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c] !== 0) usedNumbers.add(grid[r][c]);
      }
    }

    return Array.from({ length: 9 }, (_, i) => i + 1).filter(
      (num) => !usedNumbers.has(num)
    );
  }

  function createPuzzle(grid, difficulty) {
    const removalCounts = { easy: 30, medium: 40, hard: 50 };
    const cellsToRemove = removalCounts[difficulty];
    if (!cellsToRemove) throw new Error("Invalid difficulty specified.");

    const cells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        cells.push({ row, col });
      }
    }

    cells.sort(() => Math.random() - 0.5);

    let removed = 0;
    for (const { row, col } of cells) {
      if (removed >= cellsToRemove) break;

      const backup = grid[row][col];
      grid[row][col] = 0;

      if (!hasUniqueSolution([...grid.map((row) => [...row])])) {
        grid[row][col] = backup;
      } else {
        removed++;
      }
    }
  }

  function hasUniqueSolution(grid) {
    let solutionCount = 0;

    function countSolutions(grid) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            const candidates = getAllowedNumbers(grid, row, col);
            for (const value of candidates) {
              grid[row][col] = value;
              countSolutions(grid);
              if (solutionCount > 1) return;
              grid[row][col] = 0;
            }
            return;
          }
        }
      }
      solutionCount++;
    }

    countSolutions(grid);
    return solutionCount === 1;
  }

  solveSudoku(grid);
  createPuzzle(grid, difficulty);

  return grid;
}

function solve(grid, rowIdx = 0, colIdx = 0) {
  function isValid(rowIdx, colIdx, value) {
    for (let i = 0; i < 9; i++) {
      if (grid[rowIdx][i] === value || grid[i][colIdx] === value) return false;
    }

    const startRow = Math.floor(rowIdx / 3) * 3;
    const startCol = Math.floor(colIdx / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === value) return false;
      }
    }

    return true;
  }

  if (rowIdx === 9) return true;
  if (colIdx === 9) return solve(grid, rowIdx + 1, 0);
  if (grid[rowIdx][colIdx] !== 0) return solve(grid, rowIdx, colIdx + 1);

  for (let value = 1; value <= 9; value++) {
    if (isValid(rowIdx, colIdx, value)) {
      grid[rowIdx][colIdx] = value;
      if (solve(grid, rowIdx, colIdx + 1)) return grid;
      grid[rowIdx][colIdx] = 0;
    }
  }

  return false;
}
