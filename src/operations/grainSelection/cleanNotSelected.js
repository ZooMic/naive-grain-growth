import store from '../../reducers';
import { getGrainsSelection } from '../../selectors/grainsSelection';
import { getGridData } from '../../selectors/gridData';
import { setGridData } from '../../actions/gridData';

export default () => {
    const state = store.getState();
    const { gridSize, grid, colorsMap } = getGridData(state);
    const { selectedGrains } = getGrainsSelection(state);
    
    const grains = selectedGrains.map(item => Number(item));

    const newGrid = [];
    for (let i = 0; i < gridSize.row; i++) {
        newGrid.push([]);
        for (let j = 0; j < gridSize.col; j++) {
            const exist = grains.findIndex(item => item === grid[i][j]) >= 0;
            if (exist) {
                newGrid[i].push(grid[i][j]);
            } else {
                newGrid[i].push(-1);
            }
        }
    }

    const newColors = {...colorsMap};
    for (const key in newColors) {
        const id = Number(key);
        const exist = grains.findIndex(item => item === id ) >= 0;
        if (!exist) {
            delete newColors[key];
        }
    }

    setGridData(store.dispatch)({
        grid: newGrid,
        colorsMap: newColors,
        initialized: false,
    });
}