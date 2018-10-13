import {
  SET_OPERATION,
  SET_CELL_SIZE,
  SET_GRID_SIZE,
  SET_RANDOM_SEED,
  SAVE_DATA_GRID,
} from '../actions/current-grid'

const defaultState = {
  grid: [],
  common: {
    randomSeed: 10,
  },
  cellSize: {
    width: 10,
    height: 10,
  },
  gridSize: {
    columns: 25,
    rows: 25,
  },
  operationName: '',
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case SET_OPERATION:
    case SET_CELL_SIZE:
    case SET_GRID_SIZE:
    case SAVE_DATA_GRID:
      return {...state, ...action.payload };
    case SET_RANDOM_SEED:
      return {...state, common: { ...action.payload } };
    default: return state;
  }
}