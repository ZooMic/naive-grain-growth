export default ({ row, col }, amount, radius, id, grid) => {
    const points = [];
    const diameter = 2 * radius;
    for (let i = 0; i < amount; i++) {
        const r = Math.floor(Math.random() * row);
        const c = Math.floor(Math.random() * col);

        let canAdd = true;
        points.forEach(({ x, y }) => {
            const l = Math.sqrt((x - r)*(x - r) + (y - c)*(y - c));
            if (l < diameter) {
                canAdd = false;
            }
        });

        if (canAdd) {
            points.push({ x: r, y: c });
        } else {
            i -= 1;
        }
    }

    points.forEach(({x, y}) => {
        const t = x - radius;
        const b = x + radius;
        const l = y - radius;
        const r = y + radius;

        for(let i = t; i <= b; i++) {
            for (let j = l; j <= r; j++) {
                if (i >= 0 && i < row && j >= 0 && j < col) {
                    const l = Math.sqrt((x - i)*(x - i) + (y - j)*(y - j));
                    if (l < radius) {
                        grid[i][j] = id;
                    }
                }
            }
        }
    });

    return grid;
};