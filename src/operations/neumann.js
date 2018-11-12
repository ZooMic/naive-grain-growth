import { nextStep } from './common';

export default (oldData, gridSize, onFinish, opt, grains) => {
    return nextStep(neumanNeighbour, oldData, gridSize, onFinish, opt, grains);
}

const neumanNeighbour = (cell, data, opt, grains) => {
    const { x, y } = cell;

    if (data[y][x] >= 0) {
        return data[y][x];
    } else {
        const l = data[y] && data[y][x - 1];
        const r = data[y] && data[y][x + 1];
        const u = data[y - 1] && data[y - 1][x];
        const d = data[y + 1] && data[y + 1][x];

        const counter = {};
        counter[l] = counter[l] ? counter[l] + 1 : 1;
        counter[r] = counter[r] ? counter[r] + 1 : 1;
        counter[u] = counter[u] ? counter[u] + 1 : 1;
        counter[d] = counter[d] ? counter[d] + 1 : 1;

        let id;
        let max = 0;
        for (let key in counter) {
            const k = Number(key);
            if (k > 0) {
                if (grains.findIndex(item => k === item) < 0) {
                    if (counter[k] > max) {
                        id = k;
                        max = counter[k];
                    }
                }
            }
        }
        return id;
    }
}