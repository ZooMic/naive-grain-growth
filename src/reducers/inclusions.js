import { CHANGE_INCLUSIONS_PARAMETERS } from '../actions/inclusions'

const defaultState = {
  isSquare: true,
  radius: 1,
  amount: 1,
  colorID: '#000',
  isPickingColor: false,
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_INCLUSIONS_PARAMETERS:
      return changeInclusionsParameters(state, action.payload);
    default: return state;
  }
}

const changeInclusionsParameters = (state, parameters) => ({ ...state, ...parameters });