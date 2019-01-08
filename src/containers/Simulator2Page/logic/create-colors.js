const globalColors = [];
let colorId = 0;

const genColor = () => {
    let red   = Math.floor(Math.random() * 256).toString(16);
    let green = Math.floor(Math.random() * 256).toString(16);
    let blue  = Math.floor(Math.random() * 256).toString(16);

    red   = red.length   === 1 ? `0${red}`   : red;
    green = green.length === 1 ? `0${green}` : green;
    blue  = blue.length  === 1 ? `0${blue}`  : blue;

    const color = `#${red}${green}${blue}`;

    if (globalColors.findIndex((item) => item === color) === -1) {
        globalColors.push(color);
        return color;
    }

    return genColor();
}

export default function createColors(colorsAmount) {
    const colors = [];
    for (var i = 0; i < colorsAmount; ++i) {
        colors.push({
            id: colorId++,
            hash: genColor(),
        });
    }
    return colors;
}