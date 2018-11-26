import store from '../reducers';
import createGrid from '../helpers/createGrid';


export default function startMonteCarlo () {
    const {
        gridData : {
            gridSize: { row, col },
        },
        monteCarlo: { idsRange, numberOfIterations },
    } = store.getState();

    const grid = createGrid(row, col);
}