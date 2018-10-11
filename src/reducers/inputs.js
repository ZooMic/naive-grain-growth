// import { } from '../actions/inputs'
  
  const defaultState = {
    lastCorrectInput: {
      cellWidth: 10,
      cellHeight: 10,
      gridCols: 35,
      gridRows: 35,
      randomSeed: 10,
    },
    currentValue: {
      cellWidth: 10,
      cellHeight: 10,
      gridCols: 35,
      gridRows: 35,
      randomSeed: 10,
    },
    isInvalid: {
      cellWidth: false,
      cellHeight: false,
      gridCols: false,
      gridRows: false,
      randomSeed: false,
    },
  };
  
  export default (state = defaultState, action) => {
    switch(action.type) {
      default: return state;
    }
  }