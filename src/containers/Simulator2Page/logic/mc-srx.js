import { runWorker } from './worker-management';

export default function mcSRX({ callback, ...restOfOptions }) {
    if (Worker === 'undefined') {
        console.error("This browser is not supporting web workers");
        return;
    }

    const worker = runWorker(mcSrxWorker);

    worker.onerror = (error) => console.error(error);
    worker.onmessage = callback;
    worker.postMessage(restOfOptions);
    return worker;
}

// ACTUAL PROCEDURE

function mcSrxWorker() {
    const genColor = (colors) => {
        let red   = Math.floor(Math.random() * 256).toString(16);
        let green = Math.floor(Math.random() * 256).toString(16);
        let blue  = Math.floor(Math.random() * 256).toString(16);
    
        red   = red.length   === 1 ? `0${red}`   : red;
        green = green.length === 1 ? `0${green}` : green;
        blue  = blue.length  === 1 ? `0${blue}`  : blue;
    
        const color = `#${red}${green}${blue}`;
    
        if (colors.findIndex((item) => item === color) === -1) {
            return color;
        }
    
        return genColor();
    }

    function homogenousEnergyDist(size, grid) {
        const { rows, cols } = size;
        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < cols; ++j) {
                grid[i][j].energy = 5 + (5 * (randomInt(0, 1) ? -1 : 1)) * (Math.random() / 10) ; // ENERGY +- 10% of randomnes
            }
        }
    }

    function heterogenousEnergyDist(size, grid) {
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
                    grid[i][j].energy = 7 + (7 * (randomInt(0, 1) ? -1 : 1)) * (Math.random() / 10) ; // ENERGY +- 10% of randomnes
                } else {
                    grid[i][j].energy = 2 + (2 * (randomInt(0, 1) ? -1 : 1)) * (Math.random() / 10) ; // ENERGY +- 10% of randomnes
                }
            }
        }
    }
    
    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

    function calculateEnergy(item, neighboors) {
        return item.energy + neighboors.reduce((sum, neighboor) => sum += item.color.id !== neighboor.color.id ? 1 : 0, 0);
    }

    function generateNewColors(colors, amount) {
        let lastId = colors.reduce((max, next) => max < next.id ? next.id : max, -1);
        while (amount > 0) {
            colors.push({ hash: genColor(colors), id: ++lastId });
            amount -= 1;
        }
    }

    function createArrayOfNucleaons(amount, iterations, type) {
        const array = [];

        switch(type) {
            case 'constant': {
                const portion = Math.floor(amount / iterations);
                for (let i = 0; i < iterations; i++) {
                    array.push(portion);
                }
                break;
            }
            case 'increasing': {
                let portionsNumber = 0;
                for (let i = 0; i < iterations; i++) {
                    portionsNumber += i + 1;
                }
                const portion = Math.floor(amount / portionsNumber);
                for (let i = 0; i < iterations; i++) {
                    array.push(portion * (i + 1));
                }
                break;
            }
            case 'beginning': {
                for (let i = 0; i < iterations; i++) {
                    if (i === 0) {
                        array.push(amount);
                    } else {
                        array.push(0);
                    }
                }
                break;
            }
            default:;
        }

        return array;
    }


    onmessage = function(event) {
        const { callbackTime, colors, grid, size, operationId, nucleonsAmount, isHomogenous, nucleonsIterations, nucleonsDistrType } = event.data;
        
        let lastTime = new Date().getTime();
        function timeDiffPostGrid() {
            if (new Date().getTime() - lastTime >= callbackTime) {
                postMessage({grid, colors});
                lastTime = new Date().getTime();
            }
        }
        
        // ENERGY DISTRIBUTION
        if (isHomogenous) {
            homogenousEnergyDist(size, grid);
        } else {
            heterogenousEnergyDist(size, grid);
        }

        // GENERATE NEW COLORS
            // send new colors to the state
            // keep new colors for the rest of the simulation
        const prevColorsNumber = colors.length;
        generateNewColors(colors, nucleonsAmount);
        postMessage({ grid, colors });

        // GENERATE ARRAY OF NUCLEONS NUMBER
        const splitNucleonsType = nucleonsDistrType.split('-');
        const nucleonsArr = createArrayOfNucleaons(nucleonsAmount, nucleonsIterations, splitNucleonsType[0]);

        // MAIN LOOP
            // get items array
            // sort by energy power
            // set new nucleons in highest values
            // make one MC step

        let items, neighboors, rId, rItem, energy, newItem, newEnergy;
        const { rows, cols } = size;
        let colorId = prevColorsNumber;
        for (let i = 0; i < nucleonsIterations; i++) {
            items = [];
            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < cols; y++) {
                    neighboors = [];
                    for(let xx = x - 1; xx < x + 1; xx++) {
                        for (let yy = y -1; yy < y + 1; yy++) {
                            if (grid[xx] && grid[xx][yy]) {
                                if (xx !== x || yy !== y) {
                                    neighboors.push(grid[xx][yy]);
                                }
                            } 
                        }
                    }
                    // have neighboors
                    items.push({
                        object: grid[x][y],
                        energy: calculateEnergy(grid[x][y], neighboors),
                        x, y,
                    });
                }
            }
            // have all items - need to sort it
            items.sort((a, b) => a.energy < b.energy ? 1 : -1);
            for (let q = 0; q < nucleonsArr[i]; q++) {
                items[q].object.color = Object.assign({}, colors[colorId++]);
                items[q].object.energy = 0;
                items[q].object.operationId = operationId;
            }

            // now we need to do MC step

            while (items.length > 0) {
                rId = randomInt(0, items.length - 1);
                rItem = items[rId];

                // MOORE NEIGHBORHOOD
                if (rItem.object.energy !== 0) {
                    neighboors = [];
                    for (var x = rItem.x - 1; x <= rItem.x + 1; ++x) {
                        for (var y = rItem.y - 1; y <= rItem.y + 1; ++y) {
                            if ((x !== rItem.x || y !== rItem.y) && (grid[x] && grid[x][y])) {
                                neighboors.push(grid[x][y]);
                            }
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

                timeDiffPostGrid();
            }
        }


        // postMessage({ grid, currentStep: mcIterations, finished: true });
        console.log('SRX FINISHED');
    }
}