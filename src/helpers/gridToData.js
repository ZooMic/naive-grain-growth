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

export const gridToColorArray = (grid, colorsMap) => {
  const data = [];
  grid.forEach((array, x) => {
    array.forEach((id, y) => {
      if (id >= 0) {
        data.push({x, y, color: colorsMap[id]});
      }
    });
  });
  return data;
}