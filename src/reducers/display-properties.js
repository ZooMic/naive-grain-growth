var _ = require('lodash');

export default(state = {
    displayWidth: 600,
    displayHeight: 600,
    elementsWidth: 200,
    elementsHeight: 200,
}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case 'CHANGE_DISPLAY_PROPERTIES':
            newState = action.displayProperties;
            return newState;
        default:
            return state;
    }
}
