export const CHANGE_INCLUSIONS_PARAMETERS = '@inclusions/CHANGE_PARAMETERS';
export const changeInclusionsParameters = (dispatch) => (parameters = {}) => {
  dispatch({
    type: CHANGE_INCLUSIONS_PARAMETERS,
    payload: parameters,
  });
};