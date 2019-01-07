import React, {} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Collapsible from '../../components/Collapsible';
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';

import Menu from './Menu';
import { setGlobalCanvas } from '../../helpers/globalCanvas';
import './style.scss';

import { getMain } from '../../reducers/main';
import { convertGrid, convertGridEnergy } from './logic/convertGrid';


function Simulator2Page ({ cellSize, size, isInitialized, grid, isEnergyView }) {
  const setRef = (canvas) => {
    setGlobalCanvas(canvas);
  }

  let finalData = [];
  
  if (isInitialized) {
    if (isEnergyView) {
      finalData = convertGridEnergy(grid, size);
    } else {
      finalData = convertGrid(grid, size);
    }
  }

  return (
  <MainLayout>
    <div className="simulator-page">
      <Collapsible>
        <Menu />
      </Collapsible>
      <GridCanvas className={`simulator-canvas`} onRef={setRef} cellSize={cellSize} gridSize={size} data={finalData} />
    </div>
  </MainLayout>
  );
}

Simulator2Page.propTypes = {

}

const mapStateToProps = (state) => ({
  ...getMain(state),
});

const mapDispatchToProps = (dispatch, prop) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator2Page);