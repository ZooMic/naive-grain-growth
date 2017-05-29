export default(state = {
    draw: false,
    parameter: 10,
}, action) => {
    switch(action.type) {
        case 'RECRYSTALLIZATION_CHANGE':
            return action.recrystallization;
        default:
            return state;
    }
}
