import randomColor from 'random-color';

export const initialize = (randomSeed, gridSize) => {
  const { rows: r, columns: c } = gridSize;
  const data = [];
  for (let i = 0; i < randomSeed; i++) {
    const row = Math.floor(Math.random() * r);
    const col = Math.floor(Math.random() * c);
    const color = randomColor().hexString();

    const id = data.findIndex((x, y) => {
      return x === row && y === col;
    });

    if (id === -1) {
      data.push({
        x: row, y: col, color,
      });
    } else {
      i--;
    }
  }
  return data;
}

export const nextStep = (neighbourDeterminator, data, gridSize, onFinish) => {
  const newData = [];
  data.forEach(cell => {
    Array.prototype.push.apply(newData, neighbourDeterminator(cell, gridSize));
  });

  if (gridSize.rows * gridSize.columns <= newData.length + data.length) {
    onFinish();
  }

  return [...data, ...newData];
}