import { combineReducers, createStore } from 'redux';

import currentGridReducer from './current-grid';
import inputsReducer from './inputs';

const rootReducer = combineReducers({
    currentGrid: currentGridReducer,
    inputs: inputsReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;