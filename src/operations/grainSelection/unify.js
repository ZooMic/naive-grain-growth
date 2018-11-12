import store from '../../reducers';
import { getGrainsSelection } from '../../selectors/grainsSelection';
import { getGridData } from '../../selectors/gridData';
import { setGridData } from '../../actions/gridData';


export default () => {
    const state = store.getState();
    const { gridSize, grid, colorsMap } = getGridData(state);
    const { unifyColor, selectedGrains } = getGrainsSelection(state);
    const grains = selectedGrains.map(item => Number(item));

    let firstId = -1;
    if (selectedGrains.length > 0) {
        firstId = grains[0];
    }

    if (firstId === -1) {
        return;
    }

    let newGrid = [];
    for (let i = 0; i < gridSize.row; i++) {
        newGrid.push([]);
        for (let j = 0; j < gridSize.col; j++) {
            const exist = grains.findIndex(item => item === grid[i][j]) >= 0;
            if (exist) {
                newGrid[i].push(firstId);
            } else {
                newGrid[i].push(grid[i][j]);
            }
        }
    }

    const newColors = {...colorsMap};
    selectedGrains.forEach(item => delete newColors[item]);
    newColors[firstId] = unifyColor;

    setGridData(store.dispatch)({
        grid: newGrid,
        colorsMap: newColors, 
    });
}
