export default ({ row, col }, amount, diagonal, id, grid) => {
    const points = [];

    const d = Math.floor(diagonal / 2);
    const d2 = d*2;

    for (let i = 0; i < amount; i++) {
        const r = Math.floor(Math.random() * row);
        const c = Math.floor(Math.random() * col);

        let canAdd = true;
        points.forEach(({ x, y }) => {
            if (Math.abs(x - r) <= d2 && Math.abs(y - c) <= d2) {
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
        const t = x - d;
        const b = x + d;
        const l = y - d;
        const r = y + d;

        for(let i = t; i <= b; i++) {
            for (let j = l; j <= r; j++) {
                if (i >= 0 && i < row && j >= 0 && j < col) {
                    grid[i][j] = id;
                }
            }
        }
    });

    return grid;
};