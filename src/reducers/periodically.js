export default(state = true, action) => {
    switch(action.type) {
        case 'CHANGE_PERIODICALLY':
            return action.periodically;
        default:
            return state;
    }
}
