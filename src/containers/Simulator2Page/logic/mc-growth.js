import { runWorker } from './worker-management';

export default function mcGrowth({ callback, ...restOfOptions }) {
    if (Worker === 'undefined') {
        console.error("This browser is not supporting web workers");
        return;
    }

    const worker = runWorker(mcGrowthWorker);

    worker.onerror = (error) => console.error(error);
    worker.onmessage = callback;
    worker.postMessage(restOfOptions);
    return worker;
}

// ACTUAL PROCEDURE

function mcGrowthWorker() {
    function getActiveItems(size, grid) {
        const { rows, cols } = size;
        const items = [];
        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < cols; ++j) {
                if (grid[i][j].isActive) {
                    items.push(grid[i][j]);
                }
            }
        }
        return items;
    }
    
    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

    function calculateEnergy(item, neighboors) {
        return neighboors.reduce((sum, neighboor) => sum += item.color.id !== neighboor.color.id ? 1 : 0, 0);
    }

    onmessage = function(event) {
        const { callbackTime, colors, grid, mcIterations, size, operationId } = event.data;
        let lastTime = new Date().getTime();

        function timeDiffPostGrid(step = 0) {
            if (new Date().getTime() - lastTime >= callbackTime) {
                postMessage({grid, currentStep: step});
                lastTime = new Date().getTime();
            }
        }

        // INITIALIZE
        let items = getActiveItems(size, grid);

        let rColor, rItem, rId; // random elements
        const maxColor = colors.length - 1;

        while (items.length > 0) {
            rColor = randomInt(0, maxColor);
            rItem = randomInt(0, items.length - 1);
            items[rItem].color = colors[rColor];
            items[rItem].operationId = operationId;
            items.splice(rItem, 1);
            
            timeDiffPostGrid();
        }

        // MAIN LOOP


        items = [];
        const { rows, cols } = size;
        let neighboors, energy, newEnergy, newItem;


        for (var c = 0; c < mcIterations; ++c) {
            for (var i = 0; i < rows; ++i) {
                for (var j = 0; j < cols; ++j) {
                    items.push({ grid: grid[i][j], x: i, y: j });
                }
            }
            while (items.length > 0) {
                rId = randomInt(0, items.length - 1);
                rItem = items[rId];

                // MOORE NEIGHBORHOOD
                neighboors = [];
                for (var x = rItem.x - 1; x <= rItem.x + 1; ++x) {
                    for (var y = rItem.y - 1; y <= rItem.y + 1; ++y) {
                        if ((x !== rItem.x || y !== rItem.y) && (grid[x] && grid[x][y])) {
                            neighboors.push(grid[x][y]);
                        }
                    }
                }

                energy = calculateEnergy(rItem.grid, neighboors);
                newItem = neighboors[randomInt(0, neighboors.length - 1)];
                newEnergy = calculateEnergy(newItem, neighboors);
                if (newEnergy <= energy) {
                    rItem.grid.color = Object.assign({}, newItem.color);
                }

                items.splice(rId, 1);

                timeDiffPostGrid(c);
            }
        }

        postMessage({ grid, currentStep: mcIterations, finished: true });
    }
}