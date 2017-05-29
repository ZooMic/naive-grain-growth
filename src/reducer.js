import app from './reducers/app';
import menu from './reducers/menu';
import neighborhoods from './reducers/neighborhoods';
import randomizations from './reducers/randomizations';
import periodically from './reducers/periodically';
import displayProperties from './reducers/display-properties';
import recrystallization from './reducers/recrystallization';
import toolBar from './reducers/tool-bar';
import display from './reducers/display';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    app,
    menu,
    neighborhoods,
    randomizations,
    periodically,
    displayProperties,
    recrystallization,
    toolBar,
    display,
});

export default reducer;
