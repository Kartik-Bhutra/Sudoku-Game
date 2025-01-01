export default function useGrid() {
  const unsolved = generateSudoku();
  const solved = solve([...unsolved.map((row) => [...row])]);
  return { unsolved, solved };
}

function isValid(grid, rowIdx, colIdx, value) {
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

function solve(grid, rowIdx = 0, colIdx = 0) {
  function ranarray() {
    let number = [];
    let random = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i++) {
      let temp = Math.floor(Math.random() * (9 - i));
      number.push(random[temp]);
      random.splice(temp, 1);
    }
    return number;
  }

  if (rowIdx === 9) return true;
  if (colIdx === 9) return solve(grid, rowIdx + 1, 0);
  if (grid[rowIdx][colIdx] !== 0) return solve(grid, rowIdx, colIdx + 1);

  const random = ranarray();

  for (const value of random) {
    if (isValid(grid, rowIdx, colIdx, value)) {
      grid[rowIdx][colIdx] = value;
      if (solve(grid, rowIdx, colIdx + 1)) return grid;
      grid[rowIdx][colIdx] = 0;
    }
  }

  return false;
}

function generateSudoku(difficulty = "easy") {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  function createPuzzle(grid, difficulty, cells = [], removed = 0) {
    if (cells.length === 0) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          cells.push({ row, col });
        }
      }
      cells.sort(() => Math.random() - 0.5);
    }

    const removalCounts = { easy: 30, medium: 40, hard: 64 };
    const cellsToRemove = removalCounts[difficulty];
    if (!cellsToRemove) throw new Error("Invalid difficulty specified.");

    if (removed >= cellsToRemove) return;

    const { row, col } = cells.pop();
    const backup = grid[row][col];
    grid[row][col] = 0;

    if (!hasUniqueSolution([...grid.map((row) => [...row])])) {
      grid[row][col] = backup;
    } else {
      removed++;
    }

    createPuzzle(grid, difficulty, cells, removed);
  }

  function hasUniqueSolution(grid) {
    let solutionCount = 0;

    function countSolutions(grid, rowIdx = 0, colIdx = 0) {
      if (rowIdx === 9) {
        solutionCount++;
        return;
      }

      if (colIdx === 9) {
        countSolutions(grid, rowIdx + 1, 0);
        return;
      }

      if (grid[rowIdx][colIdx] !== 0) {
        countSolutions(grid, rowIdx, colIdx + 1);
        return;
      }

      for (let value = 1; value <= 9; value++) {
        if (isValid(grid,rowIdx, colIdx, value)) {
          grid[rowIdx][colIdx] = value;
          countSolutions(grid, rowIdx, colIdx + 1);
          if (solutionCount > 1) return;
          grid[rowIdx][colIdx] = 0;
        }
      }
    }

    countSolutions(grid);
    return solutionCount === 1;
  }

  solve(grid);
  createPuzzle(grid, difficulty);

  return grid;
}
