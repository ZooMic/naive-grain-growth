var _ = require('lodash');

export default(state = {
    play: false,
    init: true,
    clean: false,
    random: false,
    recrystallization: false,
}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case 'TOOL_BAR_PARAMETERS_CHANGE':
            newState = action.toolBar;
            return newState;
        default:
            return state;
    }
}
