var _ = require('lodash');

export default(state = {
    width: 600,
    height: 800,
}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case 'APP_RESIZED':
            newState = action.app;
            return newState;
        default:
            return state;
    }
}
