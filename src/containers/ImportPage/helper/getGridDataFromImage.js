export default (canvas, cellSize = { width: 1, height: 1 }) => {
    const ctx = canvas.getContext("2d");
    const { height, width } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const h = height * 4;
    const w = width * 4;
    const jumpH = cellSize.height * 4;
    const jumpW = cellSize.width * 4;

    const dataGrid = [];
    let rows = 0;
    for (let i = 0; i < h; i+=jumpH) {
        dataGrid.push([]);
        for (let j = 0; j < w; j+=jumpW) {
            const id = (i * height) + j;
            const r = data[id] && data[id].toString(16);
            const g = data[id + 1] && data[id + 1].toString(16);
            const b = data[id + 2] && data[id + 2].toString(16);
            dataGrid[rows].push(`#${r}${g}${b}`);            
        }
        rows += 1;
    }

    return dataGrid;
}