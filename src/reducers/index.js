import { combineReducers, createStore } from 'redux';

import currentGridReducer from './current-grid';
import routerReducer from './router';

const rootReducer = combineReducers({
    currentGrid: currentGridReducer,
    router: routerReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;