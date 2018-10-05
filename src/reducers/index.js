import { combineReducers, createStore } from 'redux';

import currentGridReducer from './current-grid';

const rootReducer = combineReducers({
    currentGrid: currentGridReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;