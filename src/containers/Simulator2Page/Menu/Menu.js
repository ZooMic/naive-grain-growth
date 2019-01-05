import React, { } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import 'muicss/dist/css/mui.css';
import './styles.scss';

import mcGrowth from '../logic/mc-growth';
import createGrid from '../logic/create-grid';
import createColors from '../logic/create-colors';

import { getMain, setMainParameters, defaultState } from '../../../reducers/main';


function Menu({ size, isInitialized, setMain, colorsAmount, ...restProps }) {

  const onClear = () => {
    setMain(defaultState);
  }

  const onInitialize = () => {
    const grid = createGrid(size);
    const colors = createColors(colorsAmount);
    setMain({ isInitialized: true, grid, colors });
  }

  const onGridChanged = (grid) => {
    console.log(grid);
    // setMain({ grid });
  }

  const onMcGrowth = () => {
    mcGrowth({
      ...restProps,
      size,
      isInitialized,
      colorsAmount,
      callback: onGridChanged,
      callbackTime: 1000,
    });
  }

  return (
    <div className='menu'>
      <div className='inputs-group'>
        <span className="label">Monte Carlo</span>
        <Button size="small" variant="rised" color="accent" onClick={onInitialize}>INITIALIZE</Button>
        <Button size="small" variant="rised" color="accent" onClick={onClear} disabled={!isInitialized}>CLEAR</Button>
        <Button size="small" variant="rised" color="accent" onClick={onMcGrowth} disabled={!isInitialized}>RUN</Button>
      </div>
    </div>
  );
}

Menu.propTypes = {
};

const mapStateToProps = (state) => ({
  ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
  setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);