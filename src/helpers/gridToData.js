/**
 * Converts grid type [[color: string],[color: string],[color: string]...] to [{x, y, color: string}, {}, {}...]
 */

export default (grid) => {
  const data = [];
  if (Array.isArray(grid)) {
    grid.forEach((array, x) => {
      array.forEach((color, y) => {
        if (!!color) {
          data.push({x, y, color});
        }
      });
    });
  }
  return data;
}

export const gridToColorArray = (grid, colorsMap, cellSize) => {
  const data = [];
  
  let shiftRow = 1;
  let shiftCol = 1;

  if (cellSize) {
    shiftRow = cellSize.height;
    shiftCol = cellSize.width;
  }

  const row = grid.length;
  const col = grid[0] && grid[0].length;
  for (let i = 0; i < row; i+=shiftRow) {
    for (let j = 0; j < col; j+=shiftCol) {
      if (grid[i][j] >= 0) {
        data.push({
          x: i / shiftRow,
          y: j / shiftCol,
          color: colorsMap[grid[i][j]],
        });
      }
    }
  }

  return data;
}