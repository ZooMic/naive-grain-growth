import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
 
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';
import SimulatorMenu from '../SimulatorMenu';

import { getGridData } from '../../selectors/gridData';
import { gridToColorArray } from '../../helpers/gridToData';
import { setGlobalCanvas } from '../../helpers/globalCanvas';
import './style.scss';
import { getInclusionsData } from '../../selectors/inclusions';
import { changeInclusionsParameters } from '../../actions/inclusions';

class SimulatorPage extends Component {
  onRef = (node) => {
    if (node) {
      setGlobalCanvas(node);
    }
  }

  onColorPick = ({ color }) => {
    const { isPickingColor } = this.props;
    if (isPickingColor) {
      this.props.changeInclusionsParameters({
        color,
      });
    }
  }

  render() {
    const {
      props: { cellSize, gridSize, grid, colorsMap, isPickingColor },
      onRef,
      onColorPick,
    } = this;

    const finalData = gridToColorArray(grid, colorsMap);

    return (
      <MainLayout>
        <div className="simulator-page">
          <GridCanvas className={`simulator-canvas ${isPickingColor ? 'picking-color' : ''}`} cellSize={cellSize} gridSize={gridSize} data={finalData} onRef={onRef} onClick={onColorPick} />
          <SimulatorMenu />
        </div>
      </MainLayout>
    );
  }
}

SimulatorPage.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ),
  ).isRequired,
  cellSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  gridSize: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }).isRequired,
  colorsMap: PropTypes.objectOf(PropTypes.string).isRequired,
  isPickingColor: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { grid, cellSize, gridSize, colorsMap } = getGridData(state);
  const { isPickingColor } = getInclusionsData(state);
  return { grid, cellSize, gridSize, colorsMap, isPickingColor };
};

const mapDispatchToProps = (dispatch, prop) => ({
  changeInclusionsParameters: changeInclusionsParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorPage);