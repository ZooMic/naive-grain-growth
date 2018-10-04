import { LOCATION_CHANGED } from '../actions/router';

const defaultState = {
  location: '/',
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case LOCATION_CHANGED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}