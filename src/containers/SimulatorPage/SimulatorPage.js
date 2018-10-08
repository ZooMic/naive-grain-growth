import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
 
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';
import SimulatorMenu from '../SimulatorMenu';
import defaultConfig from './helpers/default-config';

import { initialize } from '../../operations/common';

import { getCurrentGrid } from '../../selectors/current-grid';

import './style.scss';

class SimulatorPage extends Component {
  render() {

    const { cellSize, gridSize, common: { randomSeed }, operationName } = this.props;

    let data = [];
    if (operationName) {
      data = initialize(randomSeed, gridSize);
    }

    return (
      <MainLayout>
        <div className="simulator-page">
          <GridCanvas className="simulator-canvas" cellSize={cellSize} gridSize={gridSize} data={data} />
          <SimulatorMenu />
        </div>
      </MainLayout>
    );
  }
}

SimulatorPage.propTypes = {
  cellSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  gridSize: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
  }).isRequired,
  common: PropTypes.shape({
    randomSeed: PropTypes.number.isRequired,
  }).isRequired,
  operationName: PropTypes.string,
}

const mapStateToProps = (state) => {
   return getCurrentGrid(state);
};

const mapDispatchToProps = (dispatch, prop) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorPage);