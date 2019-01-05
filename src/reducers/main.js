export const defaultState = {
    grid: [],
    colors: [],
    colorsAmount: 10,
    mcIterations: 100,
    size: { rows: 150, cols: 150 },
    cellSize: { width: 4, height: 4 },
    isInitialized: false,
};
  
export default (state = defaultState, action) => {
    switch(action.type) {
        case SET_MAIN_PARAMETERS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}


// ACTIONS
export const SET_MAIN_PARAMETERS = '@main/SET_MAIN_PARAMETERS';
export const setMainParameters = (dispatch) => (parameters) => {
  dispatch({
    type: SET_MAIN_PARAMETERS,
    payload: parameters,
  });
};


// SELECTORS

export const getMain = (state) => state.main;