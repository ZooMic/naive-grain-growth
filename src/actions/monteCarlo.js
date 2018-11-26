export const CHANGE_MONTE_CARLO_PARAMETERS = '@monteCarlo/CHANGE_PARAMETERS';
export const changeMonteCarloParameters = (dispatch) => (parameters = {}) => {
  dispatch({
    type: CHANGE_MONTE_CARLO_PARAMETERS,
    payload: parameters,
  });
};