export const convertGrid = (grid, size, selected = []) => {
    const data = [];
    const { rows, cols } = size;

    for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
            if (grid[x][y].color) {
                let isSelected = false;
                for (let i = 0; i < selected.length; i++) {
                    if (grid[x][y].color.id === selected[i].id) {
                        isSelected = true;
                    }
                }
                if (isSelected) {
                    data.push({
                        x, y, color: '#FF0000',
                    });
                } else {
                    data.push({
                        x, y, color: grid[x][y].color.hash,
                    });
                }
                
            }
        }
    }

    return data;
}

const getColor = (value, max = 10) => {
    const middle = max / 2;
    const scale = 255 / middle;
    if (value < 0) {
        return '#FF000080';
    }

    if (value > max) {
        return '#00FF0080';
    }

    if (value <= middle) {
        let green = Math.floor(value * scale).toString(16);
        if (green.length < 2) {
            green = '0' + green;
        }
        return `#FF${green}0080`;
    } else {
        let red = Math.floor((middle - (value - middle))*scale).toString(16);
        if (red.length < 2) {
            red = '0' + red;
        }
        return `#${red}FF0080`;
    }
}

export const convertGridEnergy = (grid, size) => {
    const data = [];
    const { rows, cols } = size;
    let max = 0;

    for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
            if (max < grid[x][y].energy) {
                max = grid[x][y].energy;
            }
        }
    }

    for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
            if (grid[x][y].color) {
                data.push({
                    x, y, color: getColor(grid[x][y].energy, max),
                });
            }
        }
    }

    return data;
}