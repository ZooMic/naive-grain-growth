import { combineReducers, createStore } from 'redux';

import inclusionsReducer from './inclusions';
import gridDataReducer from './gridData';

const rootReducer = combineReducers({
    inclusions: inclusionsReducer,
    gridData: gridDataReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;