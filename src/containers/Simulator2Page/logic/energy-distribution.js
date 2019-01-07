import { runWorker } from './worker-management';

export default function energyDistribution({ callback, ...restOfOptions }) {
    if (Worker === 'undefined') {
        console.error("This browser is not supporting web workers");
        return;
    }

    const worker = runWorker(energyDistWorker);

    worker.onerror = (error) => console.error(error);
    worker.onmessage = callback;
    worker.postMessage(restOfOptions);
    return worker;
}

// ACTUAL PROCEDURE

function energyDistWorker() {
    function homogenousEnergyDist(size, grid, avg) {
        const { rows, cols } = size;
        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < cols; ++j) {
                grid[i][j].energy = avg + (avg * (randomInt(0, 1) ? -1 : 1)) * (Math.random() / 10) ; // ENERGY +- 10% of randomnes
            }
        }
    }

    function heterogenousEnergyDist(size, grid, min, max) {
        const { rows, cols } = size;
        let isOnEdge;

        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < cols; ++j) {
                // ON THE EDGE ALGORITHM
                isOnEdge = false;
                for (var ii = i - 1; ii < i + 1; ++ii) {
                    for (var jj = j - 1; jj < j + 1; ++jj) {
                        if (grid[ii] && grid[ii][jj]) {
                            if (grid[i][j].color.id !== grid[ii][jj].color.id) {
                                isOnEdge = true;
                            }
                        }
                    }
                }

                if (isOnEdge) {
                    grid[i][j].energy = max + (-max * (Math.random() / 10)) ; // ENERGY - 10% of randomnes
                } else {
                    grid[i][j].energy = min + (min  * (Math.random() / 10)) ; // ENERGY + 10% of randomnes
                }
            }
        }
    }
    
    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

    onmessage = function(event) {
        const { grid, size, isHomogenous, avgEnergy, minEnergy, maxEnergy } = event.data;
        
        // ENERGY DISTRIBUTION
        if (isHomogenous) {
            homogenousEnergyDist(size, grid, avgEnergy);
        } else {
            heterogenousEnergyDist(size, grid, minEnergy, maxEnergy);
        }
    
        postMessage({ grid });
    }
}