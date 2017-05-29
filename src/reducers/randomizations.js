var _ = require('lodash');

export default(state = {
    randomizationType: 'randomly',
    radius: 10,
    randomElementsNumber: 50,
}, action) => {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case 'RANDOMIZATION_TYPE_CHANGE':
            newState = action.randomizations;
            return newState;
        case 'RANDOM_ELEMENTS_NUMBER_CHANGE':
            newState.randomElementsNumber = action.randomElementsNumber;
            return newState;
        default:
            return state;
    }
}
