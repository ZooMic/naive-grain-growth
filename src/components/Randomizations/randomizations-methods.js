var _ = require('lodash');

export const methods = (randomizationType) => {
    switch(randomizationType) {
        case "randomly":
            return randomly;
        case "evenly":
            return evenly;
        case "with-radius":
            return withRadius;
        default:
            return randomly;
    }
}

const randomly = (state, actions) => {
    let matrix = _.cloneDeep(state.display.matrix);
    const w = state.displayProperties.elementsWidth;
    const h = state.displayProperties.elementsHeight;
    const rand = state.randomizations.randomElementsNumber;
    let lastId = state.display.lastId;
    let colors = _.cloneDeep((state.display.colors));

    const maxErr = w * h * 10;
    let err = 0;

    let x, y, color, id, colorExist;
    for(let i = 0; i < rand; ) {
        x = Math.floor(Math.random()*w);
        y = Math.floor(Math.random()*h);
        if(matrix[y][x] && !matrix[y][x].active) {
            while(true) {
                colorExist = false;
                color = Math.floor(Math.random() * 16777215).toString(16);
                while(color.length - 6 < 0) {
                    color = '0'+color;
                }
                color = '#' + color;
                colors.forEach((c)=>{
                    if(c === color) colorExist = true;
                });
                if(!colorExist) break;
            }
            lastId++;
            colors.push(color);
            matrix[y][x] = {
                active: true,
                color,
                id: lastId,
                edge: false,
            }
            i++;
            err = 0;
        } else {
            err++;
            if(err >= maxErr) {
                alert("Nie ma miejsca na dalsze losowanie punktów!");
                break;
            }
        }
    }

    let newObj = Object.assign( {}, state.toolBar );
    newObj.random = false;
    actions.setToolBarProperties(newObj);

    actions.updateDisplay({
        matrix,
        lastId,
        colors,
        radialPoints: state.display.radialPoints,
    });

}

const evenly = (state, actions) => {
    let matrix = [];
    let lastId = 0;
    let colors = ['#000000'];
    let radialPoints = [];

    for(let i = 0; i < state.displayProperties.elementsHeight; i++) {
        matrix.push([]);
        for(let j = 0; j < state.displayProperties.elementsWidth; j++) {
            matrix[i].push({
                active: false,
                id: lastId,
                color: '#000000',
                edge: false,
            });
        }
    }

    const w = state.displayProperties.elementsWidth;
    const h = state.displayProperties.elementsHeight;
    const rand = state.randomizations.randomElementsNumber;

    let color, colorExist;
    let sqrt = Math.ceil(Math.sqrt(rand));
    let distX = Math.ceil(w / sqrt);
    let distY = Math.ceil(h / sqrt);
    sqrt--;
    if(distX * sqrt >= w) distX--;
    if(distY * sqrt >= h) distY--;

    for(let i = 0; i < h; i+=distY) {
        for(let j = 0; j < w; j+=distX) {
            while(true) {
                colorExist = false;
                color = Math.floor(Math.random() * 16777215).toString(16);
                while(color.length - 6 < 0) {
                    color = '0'+color;
                }
                color = '#' + color;
                colors.forEach((c)=>{
                    if(c === color) colorExist = true;
                });
                if(!colorExist) break;
            }
            lastId++;
            colors.push(color);
            matrix[i][j] = {
                active: true,
                color,
                id: lastId,
                edge: false,
            }
        }
    }

    let newObj = Object.assign( {}, state.toolBar );
    newObj.random = false;
    actions.setToolBarProperties(newObj);

    actions.updateDisplay({
        matrix,
        lastId,
        colors,
        radialPoints,
    });

}

const withRadius = (state, actions) => {
    let matrix = _.cloneDeep(state.display.matrix);
    const w = state.displayProperties.elementsWidth;
    const h = state.displayProperties.elementsHeight;
    const rand = state.randomizations.randomElementsNumber;
    let lastId = state.display.lastId;
    let colors = _.cloneDeep((state.display.colors));
    let radialPoints = _.cloneDeep(state.display.radialPoints);
    const radius = state.randomizations.radius;


    const maxErr = w * h * 10;
    let err = 0;

    let x, y, color, id, colorExist, circleFit;

    for(let i = 0; i < rand; ) {
        circleFit = true;
        x = Math.floor(Math.random()*w);
        y = Math.floor(Math.random()*h);

        radialPoints.forEach((point)=>{
            let d = Math.sqrt((point.x - x)*(point.x - x)+(point.y - y)*(point.y - y));
            if(d < point.radius + radius) circleFit = false;
        });

        if(matrix[y][x] && !matrix[y][x].active && circleFit) {
            while(true) {
                colorExist = false;
                color = Math.floor(Math.random() * 16777215).toString(16);
                while(color.length - 6 < 0) {
                    color = '0'+color;
                }
                color = '#' + color;
                colors.forEach((c)=>{
                    if(c === color) colorExist = true;
                });
                if(!colorExist) break;
            }
            lastId++;
            colors.push(color);
            matrix[y][x] = {
                active: true,
                color,
                id: lastId,
                edge: false,
            }
            i++;
            err = 0;
            radialPoints.push({x, y, radius});
        } else {
            err++;
            if(err >= maxErr) {
                alert("Nie ma miejsca na dalsze losowanie punktów!");
                break;
            }
        }
    }

    let newObj = Object.assign( {}, state.toolBar );
    newObj.random = false;
    actions.setToolBarProperties(newObj);

    actions.updateDisplay({
        matrix,
        lastId,
        colors,
        radialPoints,
    });
}
