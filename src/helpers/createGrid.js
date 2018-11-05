export default (rows, columns) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for(let j = 0; j < columns; j++) {
            grid[i].push(-1);
        }
    }
    return grid;
}