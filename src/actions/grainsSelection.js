export const CHANGE_GRAINS_SELECTION_PARAMETERS = '@gridData/CHANGE_GRAINS_SELECTION_PARAMETERS';
export const changeGrainsSelectionParameters = (dispatch) => (parameters) => {
  dispatch({
    type: CHANGE_GRAINS_SELECTION_PARAMETERS,
    payload: parameters,
  });
};