import randomColor from 'random-color';

export const initialize = (randomSeed, gridSize) => {
  const { rows: r, columns: c } = gridSize;
  
  const data = [];
  for (let i = 0; i < gridSize.rows; i++) {
    data.push(new Array(gridSize.columns))
  }

  for (let i = 0; i < randomSeed; i++) {
    const row = Math.floor(Math.random() * r);
    const col = Math.floor(Math.random() * c);
    const color = randomColor().hexString();

    if(!data[row][col]) {
      data[row][col] = color;
    } else {
      i -= 1;
    }
  }

  return data;
}

export const nextStep = (neighbourDeterminator, data, gridSize, onFinish) => {
  
  let newData = new Array(gridSize.rows);
  for ( let i = 0; i < gridSize.rows; i++) {
    newData[i] = [];
    for (let j = 0; j < gridSize.columns; j++) {
      newData[i].push(data[i][j]);
    }  
  }
  
  for(let i = 0; i < gridSize.rows; i++) {
    for (let j = 0; j < gridSize.columns; j++) {
      newData[i][j] = neighbourDeterminator({x: j, y: i}, gridSize, data);
    }
  }

  let counter = 0;
  for(let i = 0; i < gridSize.rows; i++) {
    for (let j = 0; j < gridSize.columns; j++) {
      if(!!newData[i][j]) {
        counter += 1;
      }
    }
  }

  if (gridSize.rows * gridSize.columns <= counter) {
    onFinish(newData);
  }

  return newData;
}