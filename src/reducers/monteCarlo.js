import { CHANGE_MONTE_CARLO_PARAMETERS } from '../actions/monteCarlo';

const defaultState = {
  numberOfIterations: 50,
  idsRange: 10,
  steelFactor: 1,
  method: 'moore',
  grid: [],
};
  
export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_MONTE_CARLO_PARAMETERS:
      return changeMonteCarloParameters(state, action.payload);
    default: return state;
  }
}

const changeMonteCarloParameters = (state, parameters) => ({ ...state, ...parameters });