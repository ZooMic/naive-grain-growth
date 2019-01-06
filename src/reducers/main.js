export const defaultState = {
    grid: [],
    colors: [],
    colorsAmount: 10,
    mcIterations: 200,
    size: { rows: 100, cols: 100 },
    cellSize: { width: 5, height: 5 },
    isInitialized: false,
    
    isHomogenous: true, // if false => heterogenous
    isGenerated: false, // for the SRX purpose - you can not distribute energy if there is no initial structure
    nucleonsAmount: 100,
    nucleonsIterations: 25,
    nucleonsDistrType: 'constant-anywhere',

    operationId: 0,
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