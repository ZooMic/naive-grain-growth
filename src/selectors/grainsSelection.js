import store from '../reducers';

export const getGrainsSelection = (state = store.getState()) => state.grainsSelection;