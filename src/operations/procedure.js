import { initialize } from './common';
import methodFactory from './methods';

import { getGridData } from '../selectors/gridData';
import { getInclusionsData } from '../selectors/inclusions';
import { changeColorsMap, changeGrid, changeInitialized } from '../actions/gridData';
import { changeInclusionsParameters } from '../actions/inclusions';
import store from '../reducers/index';

const DEBOUNCE_TIME = 500;
let lastTime = 0;
let timeout = null;

const onUpdate = (grid, colorsMap, isFinished) => {
  const { dispatch } = store;
  if (colorsMap) {
    changeColorsMap(dispatch)(colorsMap);
  }

  changeGrid(dispatch)(grid);

  if (isFinished) {
    changeInitialized(dispatch)(true);
  }
}

const procedures = (neighborhood, options) => {
  const { isInitialized } = getInclusionsData(store.getState());
  const { randomSeed, gridSize, grid, initialized, colorsMap: cM } = getGridData(store.getState());


  if (!isInitialized || initialized) {
    clearGrid();
  }

  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  lastTime = (new Date()).getTime();

  let { data, colorsMap } = initialize(randomSeed, gridSize, grid, initialized, cM);

  onUpdate(data, colorsMap, false);
  
  const method = methodFactory(neighborhood);

  let shouldFinish = false;
  const finished = (lastData) => {
    shouldFinish = true;
    clearTimeout(timeout);
    timeout = null;
    onUpdate(lastData, null, true);
  }

  const procedure = () => {
    data = method(data, gridSize, finished, options);
    const newTime = (new Date()).getTime();
    if (newTime - lastTime >= DEBOUNCE_TIME) {
      onUpdate(data, null, false);
      lastTime = (new Date()).getTime();
    }
    
    if (!shouldFinish) {
      timeout = setTimeout(procedure, 1);
    }
  }

  timeout = setTimeout(procedure, 1);
}

export const clearGrid = () => {
  const { dispatch } = store;
  changeGrid(dispatch)([]);
  changeInitialized(dispatch)(false);
  changeInclusionsParameters(dispatch)({ isInitialized: false });
}

export const mooreProcedure = () => {
  procedures('moore');
}

export const neumannProcedure = () => {
  procedures('neumann');
}

export const moore2Procedure = () => {
  const { moore2Probability } = getGridData(store.getState());
  procedures('moore2', { moore2Probability });
}


