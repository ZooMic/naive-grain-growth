import { combineReducers, createStore } from 'redux';

import inclusionsReducer from './inclusions';
import gridDataReducer from './gridData';
import grainsSelectionReducer from './grainsSelection';
import monteCarloReducer from './monteCarlo';

import mainReducer from './main';

const rootReducer = combineReducers({
    inclusions: inclusionsReducer,
    gridData: gridDataReducer,
    grainsSelection: grainsSelectionReducer,
    monteCarlo: monteCarloReducer,
    main: mainReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;