import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import { NumberInput } from '../../components/Input';
import { setOperation, setCellSize, setGridSize, setRandomSeed } from '../../actions/current-grid';
import { getCurrentGrid } from '../../selectors/current-grid';
import 'muicss/dist/css/mui.css';
import './style.scss';
import debounce from '../../helpers/debounce';

class SimulatorMenu extends Component {
  onRunOperationClick = (operationName) => () => {
    this.props.setOperation(operationName);
  }

  onSetCellSize = (parameterName) => (eventValue) => {
    const value = parseInt(eventValue);
    const cellSize = { ...this.props.cellSize };
    if (!isNaN(value) && value > 0) {
      cellSize[parameterName] = value;
    } else {
      cellSize[parameterName] = 1;
    }
    this.props.setCellSize(cellSize);
  }

  onSetGridSize = (parameterName) => (eventValue) => {
    const value = parseInt(eventValue);
    const gridSize = { ...this.props.gridSize };
    gridSize[parameterName] = value;
    this.props.setGridSize(gridSize);
  }

  onSetRandomSeed = (eventValue) => {
    const value = parseInt(eventValue);
    this.props.setRandomSeed(value);   
  }

  render() {
    const {
      cellSize,
      gridSize,
      common: { randomSeed },
    } = this.props;
    const { onRunOperationClick, onSetCellSize, onSetGridSize, onSetRandomSeed } = this;
    const maxRandomSeed = gridSize.rows * gridSize.columns;
    return (
      <div className="simulator-menu">
        <div className="inputs-group">
          <span className="label">CELL SIZE</span>
          <NumberInput label="Width" value={cellSize.width} onChange={onSetCellSize('width')} isRequired isInteger min={1} max={20} />
          <NumberInput label="Height" value={cellSize.height} onChange={onSetCellSize('height')} isRequired isInteger min={1} max={20} />
        </div>
        <div className="inputs-group">
          <span className="label">GRID SIZE</span>
          <NumberInput label="Rows" value={gridSize.rows} onChange={onSetGridSize('rows')} isRequired isInteger min={10} max={500} />
          <NumberInput label="Columns" value={gridSize.columns} onChange={onSetGridSize('columns')} isRequired isInteger min={10} max={500} />
        </div>
        <div className="inputs-group">
          <span className="label">COMMON</span>
          <NumberInput label="Random seed" value={randomSeed} onChange={onSetRandomSeed} isRequired isInteger min={1} max={maxRandomSeed} />
        </div>
        <div className="inputs-group">
          <span className="label">RUN</span>
          <Button size="small" variant="raised" color="accent" onClick={onRunOperationClick('neumann')}>Neumann</Button>
          <Button size="small" variant="raised" color="accent" onClick={onRunOperationClick('moore')}>Moore</Button>
        </div>
      </div>
    );
  }
}

SimulatorMenu.propTypes = {
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
}

const mapStateToProps = (state) => {
  const { cellSize, gridSize, common } = getCurrentGrid(state);
  return { cellSize, gridSize, common };
};

const mapDispatchToProps = (dispatch) => ({
  setOperation: setOperation(dispatch),
  setCellSize: debounce(setCellSize(dispatch), 150),
  setGridSize: debounce(setGridSize(dispatch), 150),
  setRandomSeed: debounce(setRandomSeed(dispatch), 150),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);