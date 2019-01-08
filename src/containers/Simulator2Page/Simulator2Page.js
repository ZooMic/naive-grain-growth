import React, {} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Collapsible from '../../components/Collapsible';
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';

import Menu from './Menu';
import { setGlobalCanvas } from '../../helpers/globalCanvas';
import './style.scss';

import { getMain, setMainParameters } from '../../reducers/main';
import { convertGrid, convertGridEnergy } from './logic/convertGrid';


function Simulator2Page ({isSelectionOn, setMain, selected, cellSize, colors, size, isInitialized, grid, isEnergyView }) {
  const setRef = (canvas) => {
    setGlobalCanvas(canvas);
  }

  let finalData = [];
  
  if (isInitialized) {
    if (isEnergyView) {
      finalData = convertGridEnergy(grid, size);
    } else {
      finalData = convertGrid(grid, size, selected);
    }
  }

  const onCanvasClick = ({ row, col, color }) => {
    if (isSelectionOn) {
      const clicked = grid[row][col].color;
      // const clicked = colors.find((item) => item.hash === color);
      if (clicked) {
        const id = selected.findIndex((item) => clicked.id === item.id);
        if (id >= 0) {
          const newSelected = [...selected];
          newSelected.splice(id, 1);
          setMain({
            selected: newSelected,
          });
        } else {
          setMain({
            selected: [...selected, clicked],
          });
        }
      }
    }
  }

  return (
  <MainLayout>
    <div className="simulator-page">
      <Collapsible>
        <Menu />
      </Collapsible>
      <GridCanvas className={`simulator-canvas`} onRef={setRef} cellSize={cellSize} gridSize={size} data={finalData} onClick={onCanvasClick} />
    </div>
  </MainLayout>
  );
}

Simulator2Page.propTypes = {

}

const mapStateToProps = (state) => ({
  ...getMain(state),
});

const mapDispatchToProps = (dispatch) => ({
  setMain: setMainParameters(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator2Page);