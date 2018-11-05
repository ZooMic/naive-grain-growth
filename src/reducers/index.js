import { combineReducers, createStore } from 'redux';

import currentGridReducer from './current-grid';
import inclusionsReducer from './inclusions';
import inputsReducer from './inputs';
import gridDataReducer from './gridData';

const rootReducer = combineReducers({
    currentGrid: currentGridReducer,
    inclusions: inclusionsReducer,
    inputs: inputsReducer,
    gridData: gridDataReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;