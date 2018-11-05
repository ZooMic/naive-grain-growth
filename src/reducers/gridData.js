import { CHANGE_COLORS_MAP, CHANGE_GRID } from '../actions/gridData'

const defaultState = {
  grid: [],
  colorsMap: {},
  size: {
    row: 0,
    col: 0,
  },
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_COLORS_MAP:
      return updateColorsMap(state, action.payload);
    case CHANGE_GRID:
      return {...state, grid: action.payload };
    default: return state;
  }
}

const updateColorsMap = (state, newColorsMap) => ({
  ...state,
  colorsMap: {...state.colorsMap, ...newColorsMap },
});