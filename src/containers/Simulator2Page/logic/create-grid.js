export default function createGrid(size) {
    const { rows, cols } = size;
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for(let j = 0; j < cols; j++) {
            grid[i].push({
                isActive: false,
                color: null,
                energy: 0,
            });
        }
    }
    return grid;
}

