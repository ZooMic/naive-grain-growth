import { nextStep } from './common';

export default (oldData, gridSize, onFinish, options, grains) => {
    return nextStep(mooreNeighbour, oldData, gridSize, onFinish, options, grains);
}

const mooreNeighbour = (cell, data, { moore2Probability }, grains) => {
    const { x, y } = cell;

    if (data[y][x] >= 0) {
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


        // RULE 1
        let counter = {};
        counter[l] = counter[l] ? counter[l] + 1 : 1;
        counter[r] = counter[r] ? counter[r] + 1 : 1;
        counter[u] = counter[u] ? counter[u] + 1 : 1;
        counter[d] = counter[d] ? counter[d] + 1 : 1;
        counter[lu] = counter[lu] ? counter[lu] + 1 : 1;
        counter[ru] = counter[ru] ? counter[ru] + 1 : 1;
        counter[ld] = counter[ld] ? counter[ld] + 1 : 1;
        counter[rd] = counter[rd] ? counter[rd] + 1 : 1;

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

        if (max >= 5) {
            return id;
        }

        // RULE 2
        counter = {};
        counter[l] = counter[l] ? counter[l] + 1 : 1;
        counter[r] = counter[r] ? counter[r] + 1 : 1;
        counter[u] = counter[u] ? counter[u] + 1 : 1;
        counter[d] = counter[d] ? counter[d] + 1 : 1;
        max = 0;
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
        if (max >= 3) {
            return id;
        }

        // RULE 3
        counter = {};
        counter[lu] = counter[lu] ? counter[lu] + 1 : 1;
        counter[ru] = counter[ru] ? counter[ru] + 1 : 1;
        counter[ld] = counter[ld] ? counter[ld] + 1 : 1;
        counter[rd] = counter[rd] ? counter[rd] + 1 : 1;
        max = 0;
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
        if (max >= 3) {
            return id;
        }

        // RULE 4
        counter = {};
        counter[l] = counter[l] ? counter[l] + 1 : 1;
        counter[r] = counter[r] ? counter[r] + 1 : 1;
        counter[u] = counter[u] ? counter[u] + 1 : 1;
        counter[d] = counter[d] ? counter[d] + 1 : 1;
        counter[lu] = counter[lu] ? counter[lu] + 1 : 1;
        counter[ru] = counter[ru] ? counter[ru] + 1 : 1;
        counter[ld] = counter[ld] ? counter[ld] + 1 : 1;
        counter[rd] = counter[rd] ? counter[rd] + 1 : 1;

        max = 0;
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

        const prop = moore2Probability / 100;
        if (Math.random() <= prop) {
            return id;
        }
        return -1;
    }    
}