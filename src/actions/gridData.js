// import { actionCreator } from '../helpers';

export const SET_GRID_DATA = '@gridData/SET_GRID_DATA';
export const setGridData = (dispatch) => (gridData) => {
  dispatch({
    type: SET_GRID_DATA,
    payload: gridData,
  });
};

export const CHANGE_COLORS_MAP = '@gridData/CHANGE_COLORS_MAP';
export const changeColorsMap = (dispatch) => (colorsMap) => {
  dispatch({
    type: CHANGE_COLORS_MAP,
    payload: colorsMap,
  });
};

export const CHANGE_GRID = '@gridData/CHANGE_GRID';
export const changeGrid = (dispatch) => (grid) => {
  dispatch({
    type: CHANGE_GRID,
    payload: grid,
  });
};

export const CHANGE_GRID_SIZE = '@gridData/CHANGE_GRID_SIZE';
export const changeGridSize = (dispatch) => (gridSize) => {
  dispatch({
    type: CHANGE_GRID_SIZE,
    payload: gridSize,
  });
};

export const CHANGE_CELL_SIZE = '@gridData/CHANGE_CELL_SIZE';
export const changeCellSize = (dispatch) => (cellSize) => {
  dispatch({
    type: CHANGE_CELL_SIZE,
    payload: cellSize,
  });
};

export const CHANGE_RANDOM_SEED = '@gridData/CHANGE_RANDOM_SEED';
export const changeRandomSeed = (dispatch) => (randomSeed) => {
  dispatch({
    type: CHANGE_RANDOM_SEED,
    payload: randomSeed,
  });
};

export const CHANGE_INITIALIZED = '@gridData/CHANGE_INITIALIZED';
export const changeInitialized = (dispatch) => (isInitialized) => {
  dispatch({
    type: CHANGE_INITIALIZED,
    payload: isInitialized,
  });
}

export const CHANGE_PROBABILITY = '@gridData/CHANGE_PROBABILITY';
export const changeProbability = (dispatch) => (probability) => {
  dispatch({
    type: CHANGE_PROBABILITY,
    payload: probability,
  });
}