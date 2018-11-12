import store from '../reducers';

export const getGridData = (state = store.getState()) => state.gridData;