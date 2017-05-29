export const methods = (neighborhoodType) => {
    switch(neighborhoodType) {
        case "von-neumann":
            return vonNeumann;
        case "moore":
            return moore;
        case "hexagonal-left":
            return hexagonalLeft;
        case "hexagonal-right":
            return hexagonalRight;
        case "hexagonal-random":
            return hexagonalRandom;
        case "pentagonal-random":
            return pentagonalRandom;
        default:
            return vonNeumann;
    }
}

const vonNeumann = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);

        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;
                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }
                    if(t >= 0 && !matrix[t][j].active) {
                        newMatrix[t][j] = _.clone(matrix[i][j]);
                    }
                    if(r < w && !matrix[i][r].active) {
                        newMatrix[i][r] = _.clone(matrix[i][j]);
                    }
                    if(b < h && !matrix[b][j].active) {
                        newMatrix[b][j] = _.clone(matrix[i][j]);
                    }
                    if(l >= 0 && !matrix[i][l].active) {
                        newMatrix[i][l] = _.clone(matrix[i][j]);
                    }
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    }, 1);
}

const moore = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);

        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;

                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }

                    if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                    if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                    if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                    if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                    if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                    if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                    if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                    if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    },1);
}

const hexagonalLeft = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);

        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;

                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }

                    if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                    if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                    if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                    if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                    if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                    if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    },1);
}

const hexagonalRight = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;
                    if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);

        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;

                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }

                    if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                    if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                    if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                    if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                    if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                    if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    },1);
}

const hexagonalRandom = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l, whichWay;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);


        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                whichWay = Math.floor(Math.random() * 2);
                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;

                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }

                    if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                    if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                    if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                    if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                    if(whichWay == 0) {
                        if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                        if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                    } else {
                        if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                        if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                    }
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    },1);
}

const pentagonalRandom = (state, actions) => {
    setTimeout(()=>{
        let matrix = state.display.matrix;
        let newMatrix = _.cloneDeep(matrix);

        const width = state.displayProperties.displayWidth;
        const height = state.displayProperties.displayHeight;
        const w = state.displayProperties.elementsWidth;
        const h = state.displayProperties.elementsHeight;
        const periodically = state.periodically;

        let canvas = document.getElementById('display-canvas');
        let ctx = canvas.getContext('2d');

        let t, r, b, l, whichWay;

        const elW = Math.floor(width / w);
        const elH = Math.floor(height / h);



        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {

                if(matrix[i][j].active) {
                    t = i - 1;
                    r = j + 1;
                    b = i + 1;
                    l = j - 1;

                    if(periodically) {
                        t = (t < 0 ? h - 1 : t);
                        r = (r >= w ? 0 : r);
                        b = (b >= h ? 0 : b);
                        l = (l < 0 ? w - 1 : l);
                    }

                    whichWay = Math.floor(Math.random() * 4);

                    if(whichWay == 0) {
                        if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                        if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                        if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                        //if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                        //if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                        if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                        if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                    } else if(whichWay == 1) {
                        if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                        if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                        if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                        if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                        //if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                        if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                        //if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                    } else if(whichWay == 2) {
                        if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                        if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                        if(l >= 0 && !matrix[i][l].active) newMatrix[i][l] = _.clone(matrix[i][j]);
                        if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                        if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                        //if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                        //if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                    } else {
                        if(t >= 0 && !matrix[t][j].active) newMatrix[t][j] = _.clone(matrix[i][j]);
                        if(r < w && !matrix[i][r].active) newMatrix[i][r] = _.clone(matrix[i][j]);
                        if(b < h && !matrix[b][j].active) newMatrix[b][j] = _.clone(matrix[i][j]);
                    //    if(t >= 0 && l >= 0 && !matrix[t][l].active) newMatrix[t][l] = _.clone(matrix[i][j]);
                        if(t >= 0 && r < w && !matrix[t][r].active) newMatrix[t][r] = _.clone(matrix[i][j]);
                    //    if(b < h && l >= 0 && !matrix[b][l].active) newMatrix[b][l] = _.clone(matrix[i][j]);
                        if(b < h && r < w && !matrix[b][r].active) newMatrix[b][r] = _.clone(matrix[i][j]);
                    }
                }
            }
        }
        let onlyActiveLeft = true;
        matrix.forEach(row=>{
            row.forEach(cell=>{
                if(!cell.active) onlyActiveLeft = false;
            });
        });


        if(onlyActiveLeft) {
            let newObj = Object.assign( {}, state.toolBar);
            newObj.play = false;
            actions.setToolBarProperties(newObj);
        }

        actions.updateDisplay({
            matrix: newMatrix,
            lastId: state.display.lastId,
            colors: state.display.colors,
            radialPoints: state.display.radialPoints,
            edgeMatrix: findEdges(newMatrix, state),
        });
    },1);
}

const findEdges = (newMatrix, state) => {
    const w = state.displayProperties.elementsWidth;
    const h = state.displayProperties.elementsHeight;
    const periodically = state.periodically;
    const edgeMatrix = [];
    let t,r,b,l, notFound;

    for(let i = 0; i < h; i++) {
        edgeMatrix.push([]);
        for(let j = 0; j < w; j++) {
            edgeMatrix[i].push({
                active: false,
                id: 0,
                color: '#000000',
                edge: false,
            });
            t = i - 1;
            r = j + 1;
            b = i + 1;
            l = j - 1;

            if(periodically) {
                t = (t < 0 ? h - 1 : t);
                r = (r >= w ? 0 : r);
                b = (b >= h ? 0 : b);
                l = (l < 0 ? w - 1 : l);
            }
            notFound = true;
            if(t >= 0 && notFound) {
                if(newMatrix[t][j].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(r < w && notFound){
                if(newMatrix[i][r].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(b < h && notFound) {
                if(newMatrix[b][j].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(l >= 0 && notFound) {
                if(newMatrix[i][l].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active : newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(t >= 0 && l >= 0  && notFound) {
                if(newMatrix[t][l].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(t >= 0 && r < w  && notFound) {
                if(newMatrix[t][r].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(b < h && l >= 0  && notFound) {
                if(newMatrix[b][l].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
            if(b < h && r < w  && notFound) {
                if(newMatrix[b][r].id != newMatrix[i][j].id) {
                    edgeMatrix[i][j] = {
                        active: newMatrix[i][j].active,
                        id: newMatrix[i][j].id,
                        color: newMatrix[i][j].color,
                        edge: true,
                    }
                    notFound = false;
                }
            }
        }
    }
    return edgeMatrix;

}
