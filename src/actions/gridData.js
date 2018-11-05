import { actionCreator } from '../helpers';

export const CHANGE_COLORS_MAP = '@gridData/CHANGE_COLORS_MAP';
export const changeColorsMap = actionCreator(CHANGE_COLORS_MAP);

export const CHANGE_GRID = '@gridData/CHANGE_GRID';
export const changeGrid = (dispatch) => (grid) => {
  dispatch({
    type: CHANGE_GRID,
    payload: grid,
  });
};

export const CHANGE_GRID_SIZE = '@gridData/CHANGE_SIZE';
export const changeGridSize = (dispatch) => (size) => {
  dispatch({
    type: CHANGE_GRID_SIZE,
    payload: size,
  });
};