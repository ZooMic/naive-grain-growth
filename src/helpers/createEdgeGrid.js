import createGrid from './createGrid';

export default ({ row, col }, grid) => {
    const newGrid = createGrid(row, col);
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const t = grid[i - 1] !== undefined && grid[i - 1][j] !== undefined && grid[i][j] !== grid[i - 1][j];
            const b = grid[i + 1] !== undefined && grid[i + 1][j] !== undefined && grid[i][j] !== grid[i + 1][j];
            const l = grid[i] !== undefined && grid[i][j - 1] !== undefined && grid[i][j] !== grid[i][j - 1];
            const r = grid[i] !== undefined && grid[i][j + 1] !== undefined && grid[i][j] !== grid[i][j + 1];

            const tl = grid[i - 1] !== undefined && grid[i - 1][j - 1] !== undefined && grid[i][j] !== grid[i - 1][j - 1];
            const bl = grid[i + 1] !== undefined && grid[i + 1][j - 1] !== undefined && grid[i][j] !== grid[i + 1][j - 1];
            const tr = grid[i - 1] !== undefined && grid[i - 1][j + 1] !== undefined && grid[i][j] !== grid[i - 1][j + 1];
            const br = grid[i + 1] !== undefined && grid[i + 1][j + 1] !== undefined && grid[i][j] !== grid[i + 1][j + 1];

            if (t || b || l || r || tl || bl || tr || br) {
                newGrid[i][j] = grid[i][j];
            }
        }
    }

    return newGrid;
}