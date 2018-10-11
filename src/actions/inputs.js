export const SET_INPUT = "@inputs/SET_INPUT";
export const setInput = (dispatch) => (inputName, value, validation = { type: 'none', options: {} }) => ({
  type: SET_INPUT,
  payload: { [inputName]: value }
});