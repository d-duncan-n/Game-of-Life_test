// Функция для создания двумерного массива с размерами rows и cols, заполненного нулями.
function createGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

// Функция для отображения текущего состояния поля в консоли.
function displayGrid(grid) {
  for (let row of grid) {
    console.log(row.map(cell => (cell === 1 ? 'X' : ' ')).join(' '));
  }
}

// Функция для подсчета количества живых соседей для клетки (row, col) в поле.
function countNeighbors(grid, row, col) {
  let count = 0;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      count += grid[newRow][newCol];
    }
  }

  return count;
}

// Функция для обновления состояния поля на следующий ход.
function updateGrid(grid) {
  const newGrid = createGrid(grid.length, grid[0].length);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const cell = grid[row][col];
      const neighbors = countNeighbors(grid, row, col);

      if (cell === 1) {
        // Живая клетка.
        if (neighbors === 2 || neighbors === 3) {
          newGrid[row][col] = 1; // Клетка продолжает жить.
        } else {
          newGrid[row][col] = 0; // Клетка умирает от одиночества или перенаселения.
        }
      } else {
        // Мертвая клетка.
        if (neighbors === 3) {
          newGrid[row][col] = 1; // Клетка становится живой из-за воспроизведения.
        } else {
          newGrid[row][col] = 0; // Клетка остается мертвой.
        }
      }
    }
  }

  return newGrid;
}

// Основная функция для запуска игры.
function startGame(rows, cols, generations) {
  let grid = createGrid(rows, cols);

  // Инициализируем поле случайными живыми клетками.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[row][col] = Math.random() > 0.5 ? 1 : 0;
    }
  }

  for (let i = 0; i < generations; i++) {
    console.clear();
    console.log(`Generation ${i + 1}:`);
    displayGrid(grid);
    grid = updateGrid(grid);
    // Добавьте задержку между поколениями, чтобы было видно изменение.
    // Например: await new Promise(resolve => setTimeout(resolve, 1000));
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Запускаем игру.
startGame(10, 10, 15);
