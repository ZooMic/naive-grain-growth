import createGrid from '../../helpers/createGrid';
import store from '../../reducers';
import { changeColorsMap, changeGrid } from '../../actions/gridData';

import inclusionsBeginSquare from './inclusionsBeginSquare';
import inclusionsBeginCircle from './inclusionsBeginCircle';
import inclusionsEndSquare from './inclusionsEndSquare';
import inclusionsEndCircle from './inclusionsEndCircle';

import { getGridData } from '../../selectors/gridData';
import { getInclusionsData } from '../../selectors/inclusions';
import { changeInclusionsParameters } from '../../actions/inclusions';




export default () => {
    const { dispatch } = store;
    const state = store.getState();

    const { gridSize, initialized, grid } = getGridData(state); 
    const { amount, radius, colorID, color, isSquare } = getInclusionsData(state);
    
    let data;

    if (initialized) {
        if (isSquare) {
            data = inclusionsEndSquare(gridSize, amount, radius, colorID, grid);
        } else {
            data = inclusionsEndCircle(gridSize, amount, radius, colorID, grid);
        }
    } else {
        data = createGrid(gridSize.row, gridSize.col);
        if (isSquare) {
            data = inclusionsBeginSquare(gridSize, amount, radius, colorID, data);
        } else {
            data = inclusionsBeginCircle(gridSize, amount, radius, colorID, data);
        }
    }

    changeColorsMap(dispatch)({ [colorID]: color });
    changeGrid(dispatch)(data);
    changeInclusionsParameters(dispatch)({ isInitialized: true });
}