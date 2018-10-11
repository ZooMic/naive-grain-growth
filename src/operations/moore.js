import { nextStep } from './common';

export default (oldData, gridSize, onFinish) => {
    return nextStep(mooreNeighbour, oldData, gridSize, onFinish);
}

const mooreNeighbour = (cell, gridSize, data) => {
    const { x, y } = cell;

    if (data[y][x]) {
        return data[y][x];
    } else {
        const l = data[y] && data[y][x - 1];
        const r = data[y] && data[y][x + 1];
        const u = data[y - 1] && data[y - 1][x];
        const d = data[y + 1] && data[y + 1][x];

        const lu = data[y - 1] && data[y - 1][x - 1];
        const ru = data[y - 1] && data[y - 1][x + 1];
        const rd = data[y + 1] && data[y + 1][x - 1];
        const ld = data[y + 1] && data[y + 1][x + 1];

        const counter = {};
        counter[l] = counter[l] ? counter[l] + 1 : 1;
        counter[r] = counter[r] ? counter[r] + 1 : 1;
        counter[u] = counter[u] ? counter[u] + 1 : 1;
        counter[d] = counter[d] ? counter[d] + 1 : 1;
        counter[lu] = counter[lu] ? counter[lu] + 1 : 1;
        counter[ru] = counter[ru] ? counter[ru] + 1 : 1;
        counter[ld] = counter[ld] ? counter[ld] + 1 : 1;
        counter[rd] = counter[rd] ? counter[rd] + 1 : 1;

        let color;
        let max = 0;
        for (let key in counter) {
            if (key !== "undefined") {
                if (counter[key] > max) {
                    color = key;
                    max = counter[key];
                }
            }
        }
        
        return color;
    }    
}