var _ = require('lodash');

export default(state = {
    matrix: [],
    edgeMatrix: [],
    colors: [],
    lastId: 0,
    radialPoints: [],
}, action) => {
    switch(action.type) {
        case 'DISPLAY_INITIALIZATION':
            return action.display;
        default:
            return state;
    }
}
