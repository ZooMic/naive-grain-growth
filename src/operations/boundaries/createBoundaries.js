import store from '../../reducers';
// import { getGrainsSelection } from '../../selectors/grainsSelection';
import { getGridData } from '../../selectors/gridData';
import { setGridData } from '../../actions/gridData';

export default () => {
    const state = store.getState();
    const { gridSize, grid } = getGridData(state);

    const newGrid = [];
    for (let i = 0; i < gridSize.row; i++) {
        newGrid.push([]);
        for (let j = 0; j < gridSize.col; j++) {
            const t = grid[i - 1] !== undefined && grid[i - 1][j] !== undefined && grid[i][j] !== grid[i - 1][j];
            const b = grid[i + 1] !== undefined && grid[i + 1][j] !== undefined && grid[i][j] !== grid[i + 1][j];
            const l = grid[i] !== undefined && grid[i][j - 1] !== undefined && grid[i][j] !== grid[i][j - 1];
            const r = grid[i] !== undefined && grid[i][j + 1] !== undefined && grid[i][j] !== grid[i][j + 1];

            const tl = grid[i - 1] !== undefined && grid[i - 1][j - 1] !== undefined && grid[i][j] !== grid[i - 1][j - 1];
            const bl = grid[i + 1] !== undefined && grid[i + 1][j - 1] !== undefined && grid[i][j] !== grid[i + 1][j - 1];
            const tr = grid[i - 1] !== undefined && grid[i - 1][j + 1] !== undefined && grid[i][j] !== grid[i - 1][j + 1];
            const br = grid[i + 1] !== undefined && grid[i + 1][j + 1] !== undefined && grid[i][j] !== grid[i + 1][j + 1];

            if (t || b || l || r || tl || bl || tr || br) {
                newGrid[i].push(grid[i][j]);
            } else {
                newGrid[i].push(-1);
            }
        }
    }

    const boundaryGrid = [];
    for (let i = 0; i < gridSize.row; i++) {
        boundaryGrid.push([]);
        for (let j = 0; j < gridSize.col; j++) {
            if (newGrid[i][j] >= 0) {
                boundaryGrid[i].push(0);
            } else {
                boundaryGrid[i].push(-1);
            }
        }
    }

    setGridData(store.dispatch)({
        tempGrid: grid,
        boundaryGrid: newGrid,
        grid: newGrid,
        boundaryVisible: true,
    });


    // const { selectedGrains } = getGrainsSelection(state);
    
    // const grains = selectedGrains.map(item => Number(item));

    // const newGrid = [];
    // for (let i = 0; i < gridSize.row; i++) {
    //     newGrid.push([]);
    //     for (let j = 0; j < gridSize.col; j++) {
    //         const exist = grains.findIndex(item => item === grid[i][j]) >= 0;
    //         if (exist) {
    //             newGrid[i].push(grid[i][j]);
    //         } else {
    //             newGrid[i].push(-1);
    //         }
    //     }
    // }

    // const newColors = {...colorsMap};
    // for (const key in newColors) {
    //     const id = Number(key);
    //     const exist = grains.findIndex(item => item === id ) >= 0;
    //     if (!exist) {
    //         delete newColors[key];
    //     }
    // }

    // setGridData(store.dispatch)({
    //     grid: newGrid,
    //     colorsMap: newColors,
    //     initialized: false,
    // });
}