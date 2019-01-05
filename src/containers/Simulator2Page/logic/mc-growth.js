import mcWorker from './mc-growth.myworker';

let worker;

export default function mcGrowth({ callback, ...restOfOptions }) {
    if (Worker === 'undefined') {
        console.error("This browser is not supporting web workers");
        return;
    }
    console.log('WORKER', worker);
    if (typeof(worker) === 'undefined') {
        worker = new mcWorker();
    }

    worker.onmessage = callback;
    worker.postMessage("some");
}




// let lastTime = new Date().getTime();
// function checkIfTimePassed(limit) {
//     if (new Date().getTime() - lastTime >= limit) {
//         lastTime = new Date().getTime();
//         return true;
//     }
//     return false;
// }

// // this should be triggered only once! for example button click in menu
// /**
//  * 
//  * @param {*} options - { size, grid, callbackTime, callback, colors, numberOfMCIterations }
//  */
// function mcGrowth(options) {
//     const { grid, callback } = options;
//     initialize(options)
//         .then(() => {
//             // mc loop
//             mcLoop(options)
//                 .then(() => {
//                     callback({...grid});
//                 });
//             // end loop condition
//             // callback condition
//         });
// }

// function initialize(options) {
//     const { size, grid, colors, callbackTime, callback } = options;
//     const items = getActiveItems(size, grid);
//     let rColor, rItem;
//     const maxColor = colors.length - 1;

//     const asyncColor = (resolve = null) => {
//         if (!resolve) {
//             return new Promise((resolve) => {
//                 asyncColor(resolve);
//             });
//         }

//         let counter = 10000;
//         while (items.length > 0 && counter > 0) {
//             rColor = randomInt(0, maxColor);
//             rItem = randomInt(0, items.length - 1);
//             items[rItem].color = colors[rColor];
//             items.splice(rItem, 1);
//             --counter;
//         }

//         if(checkIfTimePassed(callbackTime)) {
//             callback({ ...grid });
//         }

//         if (items.length > 0) {
//             setTimeout(() => asyncColor(resolve), 1);
//         } else {
//             resolve();
//         }
//     }
    
//     return asyncColor();
// }

// function mcLoop(options) {
//     const { size: { rows, cols }, grid, callback, callbackTime, mcIterations } = options;
//     let loopCounter = 0;
//     const items = [];
    
//     const asyncLoop = (resolve) => {
//         console.log('ASYNC LOOP', loopCounter, resolve);
//         if (!resolve) {
//             return new Promise((resolve) => {
//                 asyncLoop(resolve);
//             });
//         }

//         // need to push items every time but plain object stays the same
//         for (var i = 0; i < rows; ++i) {
//             for (var j = 0; j < cols; ++j) {
//                 items.push(grid[i][j]);
//             }
//         }

//         // something like that
//         while (items.length > 0) {
//             const rId = randomInt(0, items.length - 1);
//             const rItem = items[rId];
//             setMcCellState(rItem, options);
//             items.splice(rId, 1);
//         }

//         ++loopCounter;
//         if (loopCounter < mcIterations) {
//             callback({...grid});
//             setTimeout(() => asyncLoop(resolve), 1);
//         } else {
//             resolve();
//         }
//     }
//     return asyncLoop();
// }

// function setMcCellState(item, options) {
//     const { grid } = options;

//     // moore neighborhood
//     const neighboors = [];
//     for (var i = item.x - 1; i < item.x + 1; ++i) {
//         for (var j = item.y - 1; i < item.y + 1; ++j) {
//             if ((i !== item.x || j !== item.x) && (grid[i] && grid[i][j])) {
//                 neighboors.push(grid[i][j]);
//             }
//         }
//     }

//     const energy = calculateEnergy(item, neighboors);
//     const newItem = neighboors[randomInt(0, neighboors.length - 1)];
//     const newEnergy = calculateEnergy(newItem, neighboors);

//     if (newEnergy < energy) {
//         item.color = { ...newItem.color };
//     }
// }

// function calculateEnergy(item, neighboors) {
//     console.log('item', item, 'neighbor', neighboors);
//    return neighboors.reduce((sum, neighboor) => sum += item.color.id !== neighboor.color.id ? 1 : 0, 0);
// }


// function getActiveItems(size, grid) {
//     const { rows, cols } = size;
//     const items = [];
//     for (var i = 0; i < rows; ++i) {
//         for (var j = 0; j < cols; ++j) {
//             if (grid[i][j].isActive) {
//                 items.push(grid[i][j]);
//             }
//         }
//     }
//     return items;
// }

// function randomInt(min, max) {
//     return Math.floor((Math.random() * (max - min + 1))) + min;
// }

// export default mcGrowth;

// /**
//  * grid structure for now
//  * {
//  *  color; - reference to the object
//  *  isActive;
//  * }
//  */