export default (canvas) => {
  const ctx = canvas.getContext("2d");
  const { height, width } = canvas;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const jumpH = 4;
  const jumpW = 4;
  const h = height * jumpH;
  const w = width * jumpW;

  const colorsId = {};
  let lastId = 1;

  const dataGrid = [];

  let rows = 0;
  for (let i = 0; i < h; i += jumpH) {
    dataGrid.push([]);
    for (let j = 0; j < w; j += jumpW) {
      const id = (i * width) + j;
      const r = data[id] && data[id].toString(16);
      const g = data[id + 1] && data[id + 1].toString(16);
      const b = data[id + 2] && data[id + 2].toString(16);
      const color = `#${r}${g}${b}`;
      
      if (!colorsId[color]) {
        colorsId[color] = lastId++;
      }
      dataGrid[rows].push(colorsId[color]);
    }
    rows += 1;
  }

  const colorsMap = {};
  for (const key in colorsId) {
    colorsMap[colorsId[key]] = key;
  }

  const cellSize = { width: 1, height: 1 };

  const row = dataGrid.length;
  const col = dataGrid[0] && dataGrid[0].length;


  return { grid: dataGrid, colorsMap, cellSize, gridSize: { row, col } };
}