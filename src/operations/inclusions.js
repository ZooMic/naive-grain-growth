import createGrid from '../helpers/createGrid';

const randomSquareBeginning = (options) => {
  const {
    inclusions: { amount, radius, color },
    gridSize: { rows, columns },
  } = options;

  const diagonal = radius - 1;
  const halfDiag = Math.floor(diagonal / 2);
  const grid = createGrid(rows, columns);
  
  const rand = (val) => Math.floor(Math.random() * (val - diagonal)) + halfDiag;

  for (let a = 0; a < amount; a++) {
    const x = rand(rows);
    const y = rand(columns);

    let xs = x - halfDiag;
    let xe = x + halfDiag;
    let ys = y - halfDiag;
    let ye = y + halfDiag;

    const diagEven = diagonal % 2 === 0;
    let shiftX = false;
    let shiftY = false;

    if (diagEven) {
      shiftX = !!Math.floor(Math.random() * 2);
      shiftY = !!Math.floor(Math.random() * 2);
      xs += shiftX ? 1 : 0;
      xe += shiftX ? 0 : 1;
      ys += shiftY ? 1 : 0;
      ye += shiftY ? 0 : 0;
    }

    let exist = false;
    for (let i = xs; i <= xe; i++) {
      for (let j = ys; j <= ye; j++) {
        if (grid[i][j] === color) {
          exist = true;
        }
      }
    }

    if (exist) {
      a -= 1;
    }
    else {
      for (let i = xs; i <= xe; i++) {
        for (let j = ys; j <= ye; j++) {
          grid[i][j] = color;
        }
      }
    }
  }
  return grid;
}

const randomCircleBeginning = (options) => {

}

const randomSquareEnd = (data, options) => {

}

const randomCircleEnd = (data, options) => {

}

export default (data, options) => {
  const {
    gridSize: { rows },
    inclusions: { isSquare },
  } = options;

  let newData;
  if (data && data.length && data.length === rows) {
    if (isSquare) {
      newData = randomSquareEnd(data, options);
    } else {
      newData = randomCircleEnd(data, options);
    }
  } else {
    if (isSquare) {
      newData = randomSquareBeginning(options);
    } else {
      newData = randomCircleBeginning(options);
    }
  }

  return newData;
}