export const SET_OPERATION = "@CURRENT-GRID/SET_OPERATION";
export const setOperation = (dispatch) => (operationName) => dispatch({
  type: SET_OPERATION,
  payload: { operationName },
});

export const SET_CELL_SIZE = "@CURRENT-GRID/SET_CELL_SIZE";
export const setCellSize = (dispatch) => (cellSize) => dispatch({
  type: SET_CELL_SIZE,
  payload: { cellSize },
});

export const SET_GRID_SIZE = "@CURRENT-GRID/SET_GRID_SIZE";
export const setGridSize = (dispatch) => (gridSize) => dispatch({
  type: SET_GRID_SIZE,
  payload: { gridSize },
});


export const SET_RANDOM_SEED = "@CURRENT-GRID/SET_RANDOM_SEED";
export const setRandomSeed = (dispatch) => (randomSeed) => dispatch({
  type: SET_RANDOM_SEED,
  payload: { randomSeed },
});


export const SAVE_DATA_GRID = "@CURRENT-GRID/SAVE_DATA_GRID";
export const saveDataGrid = (dispatch) => (dataGrid) => dispatch({
  type: SAVE_DATA_GRID,
  payload: { grid: dataGrid },
});
