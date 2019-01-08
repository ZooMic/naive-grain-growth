import { runWorker } from './worker-management';

export default function caGrowth({ callback, ...restOfOptions }) {
    if (Worker === 'undefined') {
        console.error("This browser is not supporting web workers");
        return;
    }

    console.log('WORKER STARTED', restOfOptions);
    const worker = runWorker(caGrowthWorker);

    worker.onerror = (error) => console.error(error);
    worker.onmessage = callback;
    worker.postMessage(restOfOptions);
    return worker;
}

// ACTUAL PROCEDURE

function caGrowthWorker() {
    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

    onmessage = function(event) {
        const { callbackTime, colors, grid, size, caType, moore2Probability } = event.data;
        
        const { rows, cols } = size;

        let lastTime = new Date().getTime();

        let tColors = {};
        function checkColor(item) {
            if (item.color) {
                if (!tColors[item.color.hash]) {
                    tColors[item.color.hash] = { color: item.color, amount: 1 };
                } else {
                    tColors[item.color.hash].amount += 1;
                }
            }
        }

        function neuman() {
            let neighboors, maxItem, somethingChanged = true;
            let grid1 = grid;
            while (somethingChanged) {
                somethingChanged = false;
                const grid2 = [];
                for (let i = 0; i < rows; i++) {
                    grid2.push([])
                    for (let j = 0; j < cols; j++){
                        grid2[i].push(Object.assign({}, grid1[i][j]));
                    }
                }

                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (!grid1[i][j].color) {
                            maxItem =  { amount: 0 };
                            neighboors = [];

                            const u = i - 1;
                            const d = i + 1;
                            const l = j - 1;
                            const r = j + 1;

                            if (grid1[i] && grid1[i][l] && grid1[i][l].isActive) {
                                neighboors.push(grid1[i][l]);
                            }
                            if (grid1[i] && grid1[i][r] && grid1[i][r].isActive) {
                                neighboors.push(grid1[i][r]);
                            }
                            if (grid1[u] && grid1[u][j] && grid1[u][j].isActive) {
                                neighboors.push(grid1[u][j]);
                            }
                            if (grid1[d] && grid1[d][j] && grid1[d][j].isActive) {
                                neighboors.push(grid1[d][j]);
                            }

                            tColors = {};
                            neighboors.forEach(checkColor);
                            for (let key in tColors) {
                                const amount = tColors[key].amount;
                                if (amount > maxItem.amount) {
                                    maxItem = tColors[key];
                                }
                            }

                            if (maxItem.color) {
                                grid2[i][j].color = Object.assign({}, maxItem.color);
                                grid2[i][j].isActive = true;
                                somethingChanged = true;
                            }
                        }
                    }
                }
                grid1 = grid2;
                if (new Date().getTime() - lastTime >= callbackTime) {
                    postMessage({grid, finished: false});
                    lastTime = new Date().getTime();
                }
            }
            return grid1;
        }

        function moore() {
            let neighboors, maxItem, somethingChanged = true;
            let grid1 = grid;
            while (somethingChanged) {
                somethingChanged = false;
                const grid2 = [];
                for (let i = 0; i < rows; i++) {
                    grid2.push([])
                    for (let j = 0; j < cols; j++){
                        grid2[i].push(Object.assign({}, grid1[i][j]));
                    }
                }

                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (!grid1[i][j].color) {
                            maxItem =  { amount: 0 };
                            neighboors = [];

                            const u = i - 1;
                            const d = i + 1;
                            const l = j - 1;
                            const r = j + 1;

                            if (grid1[i] && grid1[i][l] && grid1[i][l].isActive) {
                                neighboors.push(grid1[i][l]);
                            }
                            if (grid1[i] && grid1[i][r] && grid1[i][r].isActive) {
                                neighboors.push(grid1[i][r]);
                            }
                            if (grid1[u] && grid1[u][j] && grid1[u][j].isActive) {
                                neighboors.push(grid1[u][j]);
                            }
                            if (grid1[d] && grid1[d][j] && grid1[d][j].isActive) {
                                neighboors.push(grid1[d][j]);
                            }

                            if (grid1[u] && grid1[u][l] && grid1[u][l].isActive) {
                                neighboors.push(grid1[u][l]);
                            }
                            if (grid1[u] && grid1[u][r] && grid1[u][r].isActive) {
                                neighboors.push(grid1[u][r]);
                            }
                            if (grid1[d] && grid1[d][l] && grid1[d][l].isActive) {
                                neighboors.push(grid1[d][l]);
                            }
                            if (grid1[d] && grid1[d][r] && grid1[d][r].isActive) {
                                neighboors.push(grid1[d][r]);
                            }

                            tColors = {};
                            neighboors.forEach(checkColor);
                            for (let key in tColors) {
                                const amount = tColors[key].amount;
                                if (amount > maxItem.amount) {
                                    maxItem = tColors[key];
                                }
                            }

                            if (maxItem.color) {
                                grid2[i][j].color = Object.assign({}, maxItem.color);
                                grid2[i][j].isActive = true;
                                somethingChanged = true;
                            }
                        }
                    }
                }
                grid1 = grid2;
                if (new Date().getTime() - lastTime >= callbackTime) {
                    postMessage({grid, finished: false});
                    lastTime = new Date().getTime();
                }
            }
            return grid1;
        }

        function moore2() {
            let neighboors, maxItem, somethingChanged = true;
            let grid1 = grid;
            while (somethingChanged) {
                somethingChanged = false;
                const grid2 = [];
                for (let i = 0; i < rows; i++) {
                    grid2.push([])
                    for (let j = 0; j < cols; j++){
                        grid2[i].push(Object.assign({}, grid1[i][j]));
                    }
                }

                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (!grid1[i][j].color) {
                            let finish = false;
                            // Rule 1 - 
                            maxItem =  { amount: 0 };
                            neighboors = [];

                            const u = i - 1;
                            const d = i + 1;
                            const l = j - 1;
                            const r = j + 1;

                            if (grid1[i] && grid1[i][l] && grid1[i][l].isActive) {
                                neighboors.push(grid1[i][l]);
                            }
                            if (grid1[i] && grid1[i][r] && grid1[i][r].isActive) {
                                neighboors.push(grid1[i][r]);
                            }
                            if (grid1[u] && grid1[u][j] && grid1[u][j].isActive) {
                                neighboors.push(grid1[u][j]);
                            }
                            if (grid1[d] && grid1[d][j] && grid1[d][j].isActive) {
                                neighboors.push(grid1[d][j]);
                            }

                            if (grid1[u] && grid1[u][l] && grid1[u][l].isActive) {
                                neighboors.push(grid1[u][l]);
                            }
                            if (grid1[u] && grid1[u][r] && grid1[u][r].isActive) {
                                neighboors.push(grid1[u][r]);
                            }
                            if (grid1[d] && grid1[d][l] && grid1[d][l].isActive) {
                                neighboors.push(grid1[d][l]);
                            }
                            if (grid1[d] && grid1[d][r] && grid1[d][r].isActive) {
                                neighboors.push(grid1[d][r]);
                            }

                            tColors = {};
                            neighboors.forEach(checkColor);
                            for (let key in tColors) {
                                const amount = tColors[key].amount;
                                if (amount > maxItem.amount) {
                                    maxItem = tColors[key];
                                }
                            }

                            if (maxItem.amount >= 5) {
                                grid2[i][j].color = Object.assign({}, maxItem.color);
                                grid2[i][j].isActive = true;
                                somethingChanged = true;
                                finish = true;
                            }

                            // Rule 2 -
                            if (!finish) {
                                maxItem =  { amount: 0 };
                                neighboors = [];
                                if (grid1[i] && grid1[i][l] && grid1[i][l].isActive) {
                                    neighboors.push(grid1[i][l]);
                                }
                                if (grid1[i] && grid1[i][r] && grid1[i][r].isActive) {
                                    neighboors.push(grid1[i][r]);
                                }
                                if (grid1[u] && grid1[u][j] && grid1[u][j].isActive) {
                                    neighboors.push(grid1[u][j]);
                                }
                                if (grid1[d] && grid1[d][j] && grid1[d][j].isActive) {
                                    neighboors.push(grid1[d][j]);
                                }

                                tColors = {};
                                neighboors.forEach(checkColor);
                                for (let key in tColors) {
                                    const amount = tColors[key].amount;
                                    if (amount > maxItem.amount) {
                                        maxItem = tColors[key];
                                    }
                                }

                                if (maxItem.amount >= 3) {
                                    grid2[i][j].color = Object.assign({}, maxItem.color);
                                    grid2[i][j].isActive = true;
                                    somethingChanged = true;
                                    finish = true;
                                }
                            }
                            
                            
                            // Rule 3
                            if (!finish) {
                                maxItem =  { amount: 0 };
                                neighboors = [];
                                if (grid1[u] && grid1[u][l] && grid1[u][l].isActive) {
                                    neighboors.push(grid1[u][l]);
                                }
                                if (grid1[u] && grid1[u][r] && grid1[u][r].isActive) {
                                    neighboors.push(grid1[u][r]);
                                }
                                if (grid1[d] && grid1[d][l] && grid1[d][l].isActive) {
                                    neighboors.push(grid1[d][l]);
                                }
                                if (grid1[d] && grid1[d][r] && grid1[d][r].isActive) {
                                    neighboors.push(grid1[d][r]);
                                }
    
                                tColors = {};
                                neighboors.forEach(checkColor);
                                for (let key in tColors) {
                                    const amount = tColors[key].amount;
                                    if (amount > maxItem.amount) {
                                        maxItem = tColors[key];
                                    }
                                }
    
                                if (maxItem.amount >= 3) {
                                    grid2[i][j].color = Object.assign({}, maxItem.color);
                                    grid2[i][j].isActive = true;
                                    somethingChanged = true;
                                    finish = true;
                                }
                            }
                            

                            // Rule 4
                            if (!finish) {
                                maxItem =  { amount: 0 };
                                neighboors = [];
    
                                if (grid1[i] && grid1[i][l] && grid1[i][l].isActive) {
                                    neighboors.push(grid1[i][l]);
                                }
                                if (grid1[i] && grid1[i][r] && grid1[i][r].isActive) {
                                    neighboors.push(grid1[i][r]);
                                }
                                if (grid1[u] && grid1[u][j] && grid1[u][j].isActive) {
                                    neighboors.push(grid1[u][j]);
                                }
                                if (grid1[d] && grid1[d][j] && grid1[d][j].isActive) {
                                    neighboors.push(grid1[d][j]);
                                }
    
                                if (grid1[u] && grid1[u][l] && grid1[u][l].isActive) {
                                    neighboors.push(grid1[u][l]);
                                }
                                if (grid1[u] && grid1[u][r] && grid1[u][r].isActive) {
                                    neighboors.push(grid1[u][r]);
                                }
                                if (grid1[d] && grid1[d][l] && grid1[d][l].isActive) {
                                    neighboors.push(grid1[d][l]);
                                }
                                if (grid1[d] && grid1[d][r] && grid1[d][r].isActive) {
                                    neighboors.push(grid1[d][r]);
                                }
    
                                tColors = {};
                                neighboors.forEach(checkColor);
                                for (let key in tColors) {
                                    const amount = tColors[key].amount;
                                    if (amount > maxItem.amount) {
                                        maxItem = tColors[key];
                                    }
                                }
    
                                if ((moore2Probability / 100) >= Math.random()) {
                                    grid2[i][j].color = Object.assign({}, maxItem.color);
                                    grid2[i][j].isActive = true;
                                    somethingChanged = true;
                                    finish = true;
                                } else {
                                    somethingChanged = true;
                                }
                            }
                        }
                    }
                }
                grid1 = grid2;
                if (new Date().getTime() - lastTime >= callbackTime) {
                    postMessage({grid, finished: false});
                    lastTime = new Date().getTime();
                }
            }
            return grid1;
        }

        // INITIALIZE

        // copy colors arr
        const tempColors = [];
        for (let i = 0; i < colors.length; ++i) {
            tempColors.push(Object.assign({}, colors[i]));
        }

        // put seeds
        while(tempColors.length > 0) {
            let rX = randomInt(0, rows - 1);
            let rY = randomInt(0, cols - 1);

            if (!grid[rX][rY].color) {
                grid[rX][rY].color = tempColors[0];
                tempColors.splice(0, 1);
                grid[rX][rY].isActive = true;
            }
        }

        // MAIN LOOP
        let newGrid = grid;
        switch(caType) {
            case 'neuman':
                newGrid = neuman();
                break;
            case 'moore':
                newGrid = moore();
                break;
            case 'moore2':
                newGrid = moore2();
                break;
            default:;
        }

        postMessage({ grid : newGrid, finished: true });
    }
}