import { combineReducers, createStore } from 'redux';

import inclusionsReducer from './inclusions';
import gridDataReducer from './gridData';
import grainsSelectionReducer from './grainsSelection';

const rootReducer = combineReducers({
    inclusions: inclusionsReducer,
    gridData: gridDataReducer,
    grainsSelection: grainsSelectionReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;