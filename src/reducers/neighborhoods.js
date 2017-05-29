var _ = require('lodash');

export default(state = {
    neighborhoodType: 'von-neumann',
}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case 'NEIGHBORHOOD_TYPE_CHANGE':
            newState = action.neighborhoods;
            return newState;
        default:
            return state;
    }
}
