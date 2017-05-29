var _ = require('lodash');

export default(state = {}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        // case 'APP_RESIZED':
        //     newState = action.app;
        //     return newState;
        default:
            return state;
    }
}
