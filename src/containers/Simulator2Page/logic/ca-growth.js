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
        const { callbackTime, colors, grid, size, caType } = event.data;
        
        const { rows, cols } = size;

        let lastTime = new Date().getTime();

        function checkColor(item, tColors) {
            if (tColors[item.color]) {
                if (!tColors[item.color.hash]) {
                    tColors[item.color.hash] = { color: item.color, amount: 1 }
                } else {
                    tColors[item.color.hash].amount += 1;
                }
            }
        }

        function neuman() {
            let neighboors, maxItem, tColors, somethingChanged = true;
            while (somethingChanged) {
                somethingChanged = false;
                console.log('loop');
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        neighboors = [];
                        tColors = {};
                        maxItem =  { amount: 0 };
                        if (!grid[i][j].color) {
                            if (grid[i] && grid[i][j - 1] && grid[i][j - 1].color) {
                                neighboors.push(grid[i][j - 1]);
                            }
                            if (grid[i] && grid[i][j + 1] && grid[i][j + 1].color) {
                                neighboors.push(grid[i][j + 1]);
                            }
                            if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j].color) {
                                neighboors.push(grid[i - 1][j]);
                            }
                            if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j].color) {
                                neighboors.push(grid[i + 1][j]);
                            }
                            neighboors.forEach(checkColor, tColors);
                            for (let key in tColors) {
                                const amount = tColors[key];
                                if (amount > maxItem.amount) {
                                    maxItem = tColors[key];
                                }
                            }
                            if (maxItem.color) {
                                grid[i][j].color = Object.assign({}, maxItem.color);
                                grid[i][j].isActive = true;
                                somethingChanged = true;
                            }
                        }
                    }
                }
                console.log('ornotloop');
                if (new Date().getTime() - lastTime >= callbackTime) {
                    postMessage({grid, finished: false});
                    lastTime = new Date().getTime();
                }
            }
        }

        function moore() {

        }

        function moore2() {

        }

        // INITIALIZE

        // copy colors arr
        const tempColors = [];
        for (let i = 0; i < colors.length; ++i) {
            tempColors.push(colors[i]);
        }

        // put seeds
        while(tempColors.length > 0) {
            let rX = randomInt(0, rows - 1);
            let rY = randomInt(0, cols - 1);

            if (!grid[rX][rY].isActive) {
                grid[rX][rY].color = tempColors[0];
                tempColors.splice(0, 1);
            }
        }

        // MAIN LOOP
        console.log('acType', caType);
        switch(caType) {
            case 'neuman':
                neuman();
                break;
            case 'moore':
                moore();
                break;
            case 'moore2':
                moore2();
                break;
            default:;
        }

        postMessage({ grid, finished: true });
    }
}