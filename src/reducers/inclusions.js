import { CHANGE_INCLUSIONS_PARAMETERS } from '../actions/inclusions'

const defaultState = {
  isSquare: true,
  radius: 1,
  amount: 1,
  color: '#000',
  colorID: 0,
  isPickingColor: false,
  isInitialized: false,
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_INCLUSIONS_PARAMETERS:
      return changeInclusionsParameters(state, action.payload);
    default: return state;
  }
}

const changeInclusionsParameters = (state, parameters) => ({ ...state, ...parameters });