import { CHANGE_GRAINS_SELECTION_PARAMETERS } from '../actions/grainsSelection'

const defaultState = {
  unifyColor: '#FF0090',
  isSelectingGrain: false,
  selectedGrains: [],
  isApplyed: false,
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_GRAINS_SELECTION_PARAMETERS:
      return changeGrainsSelectionParameters(state, action.payload);
    default: return state;
  }
}

const changeGrainsSelectionParameters = (state, parameters) => ({ ...state, ...parameters });