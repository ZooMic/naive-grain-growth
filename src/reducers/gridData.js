import {
  CHANGE_COLORS_MAP,
  CHANGE_GRID,
  CHANGE_GRID_SIZE,
  CHANGE_CELL_SIZE,
  CHANGE_RANDOM_SEED,
  CHANGE_INITIALIZED,
  CHANGE_PROBABILITY,
  SET_GRID_DATA,
} from '../actions/gridData'

const defaultState = {
  grid: [],
  colorsMap: {},
  gridSize: {
    row: 150,
    col: 150,
  },
  cellSize: {
    height: 3,
    width: 3,
  },
  randomSeed: 30,
  initialized: false,
  moore2Probability: 19,
  boundaryGrid: null,
  boundaryVisible: false,
  tempGrid: [],
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case SET_GRID_DATA:
      return { ...state, ...action.payload };
    case CHANGE_COLORS_MAP:
      return updateColorsMap(state, action.payload);
    case CHANGE_GRID:
      return { ...state, grid: action.payload };
    case CHANGE_GRID_SIZE:
      return updateGridSize(state, action.payload);
    case CHANGE_CELL_SIZE:
      return updateCellSize(state, action.payload);
    case CHANGE_RANDOM_SEED:
      return { ...state, randomSeed: action.payload };
    case CHANGE_INITIALIZED:
      return { ...state, initialized: action.payload };
    case CHANGE_PROBABILITY:
      return { ...state, moore2Probability: action.payload };
    default: return state;
  }
}

const updateColorsMap = (state, newColorsMap) => ({
  ...state,
  colorsMap: { ...state.colorsMap, ...newColorsMap },
});

const updateGridSize = (state, newGridSize) => ({
  ...state,
  gridSize: { ...state.gridSize, ...newGridSize },
});

const updateCellSize = (state, newCellSize) => ({
  ...state,
  cellSize: { ...state.cellSize, ...newCellSize },
});