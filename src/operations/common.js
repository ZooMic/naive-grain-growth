import randomColor from 'random-color';
import createGrid from '../helpers/createGrid';

let globalId = 1;

export const initialize = (randomSeed, { row, col }, grid, isInitialized, colMap) => {
  let data;
  if (grid.length === 0) {
    data = createGrid(row, col);
  } else {
    data = grid;
  }
  
  const colorsMap = colMap;

  for (let i = globalId; i < globalId + randomSeed; i++) {
    const r = Math.floor(Math.random() * row);
    const c = Math.floor(Math.random() * col);
    const id = i + 1;

    if(data[r][c] < 0) {
      data[r][c] = id;
      colorsMap[id] = randomColor().hexString();
    } else {
      i -= 1;
    }
  }

  globalId += randomSeed;

  return { data, colorsMap };
}

export const nextStep = (neighbourDeterminator, data, { row, col }, onFinish, options, grains) => {
  let newData = new Array(row);
  for ( let i = 0; i < row; i++) {
    newData[i] = [];
    for (let j = 0; j < col; j++) {
      newData[i].push(data[i][j]);
    }
  }
  
  for(let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      newData[i][j] = neighbourDeterminator({x: j, y: i}, data, options, grains);
    }
  }

  let counter = 0;
  for(let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if(newData[i][j] >= 0) {
        counter += 1;
      }
    }
  }

  if (row * col <= counter) {
    onFinish(newData);
  }

  return newData;
}