import React, { PureComponent } from 'react';
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
import { changeColorsMap } from '../../actions/gridData';

import { getGrainsSelection } from '../../selectors/grainsSelection';
import { changeGrainsSelectionParameters } from '../../actions/grainsSelection';



class SimulatorPage extends PureComponent {
  onRef = (node) => {
    if (node) {
      setGlobalCanvas(node);
    }
  }

  onColorPick = ({ color }) => {
    const { isPickingColor, isSelectingGrain, selectedGrains, colorsMap } = this.props;
    if (isPickingColor) {
      this.props.changeInclusionsParameters({
        color,
      });
      this.props.changeColorsMap({
        0: color,
      });
    }

    if (isSelectingGrain) {
      const newGrains = [...selectedGrains];
      const id = Object.keys(colorsMap).find(key => colorsMap[key] === color);
      if (id === undefined || id === null) {
        return;
      }
      const existId = newGrains.findIndex(value => value === id);
      if (existId >= 0) {
        newGrains.splice(existId, 1);
      } else {
        newGrains.push(id);
      }
      this.props.changeGrainsSelectionParameters({
        selectedGrains: newGrains,
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
  const { isSelectingGrain, selectedGrains } = getGrainsSelection(state);
  const { grid, cellSize, gridSize, colorsMap } = getGridData(state);
  const { isPickingColor } = getInclusionsData(state);
  return { grid, cellSize, gridSize, colorsMap, isPickingColor, isSelectingGrain, selectedGrains};
};

const mapDispatchToProps = (dispatch, prop) => ({
  changeInclusionsParameters: changeInclusionsParameters(dispatch),
  changeColorsMap: changeColorsMap(dispatch),
  changeGrainsSelectionParameters: changeGrainsSelectionParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorPage);