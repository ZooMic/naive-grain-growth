export default function convertGrid(grid, size) {
    const data = [];
    const { rows, cols } = size;

    for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
        if (grid[x][y].color) {
            data.push({
            x, y, color: grid[x][y].color.hash,
            });
        }
        }
    }

    return data;
}