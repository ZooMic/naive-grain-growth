import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color'
import Button from 'muicss/lib/react/button';
import Switch from '../../components/Switch';
import Icon, { icons } from '../../components/Icon';
import { NumberInput, Input } from '../../components/Input';
import { setOperation, setCellSize, setGridSize, setRandomSeed, saveInclusions } from '../../actions/current-grid';
import { getCurrentGrid } from '../../selectors/current-grid';
import 'muicss/dist/css/mui.css';
import './style.scss';
import { getGlobalCanvas } from '../../helpers/globalCanvas';
import startInclusions from '../../operations/inclusions';

class SimulatorMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'nng-export',
    };
  }

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

  onExportToText = () => {
    const { filename: fn } = this.state;
    const { grid } = this.props;
    const filename = `${fn}.json`;
    const jsonString = JSON.stringify(grid);
    const element = document.createElement('a');
    const blob = new Blob([jsonString], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    element.setAttribute('href', url);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onExportToImage = () => {
    const { filename } = this.state;
    const canvas = getGlobalCanvas();
    const img = canvas.toDataURL("image/png");

    const element = document.createElement('a');
    element.setAttribute('href', img);
    element.setAttribute('download', `${filename}.png`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onFilenameChange = (eventValue) => {
    this.setState({
      filename: eventValue,
    });
  }

  onInclusionsSwitchChanged = () => {
    const { inclusions, saveInclusions } = this.props;
    saveInclusions({
      ...inclusions,
      isSquare: !inclusions.isSquare,
    });
  }

  onInclusionsInput = (parameterName) => (eventValue) => {
    const { inclusions, saveInclusions } = this.props;
    saveInclusions({
      ...inclusions,
      [parameterName]: parseInt(eventValue),
    });
  }

  onInclusionsApply = () => {
    const { inclusions, grid, cellSize, gridSize } = this.props;
    startInclusions(grid, { inclusions, cellSize, gridSize });
  }

  onColorPickerOpen = () => {
    const { inclusions, saveInclusions } = this.props;
    saveInclusions({
      ...inclusions,
      isPickingColor: true,
    });
  }

  onColorPickerClose = () => {
    const { inclusions, saveInclusions } = this.props;
    saveInclusions({
      ...inclusions,
      isPickingColor: false,
    });
  }

  onColorChange = (event) => {
    const { hex } = event;
    const { inclusions, saveInclusions } = this.props;
    saveInclusions({
      ...inclusions,
      color: hex,
    });
  }

  render() {
    const {
      state: {
        filename,
      },
      props: {
        cellSize,
        gridSize,
        common: { randomSeed },
        inclusions: { isSquare, amount, radius, color, isPickingColor },
      },
      onRunOperationClick,
      onSetCellSize,
      onSetGridSize,
      onSetRandomSeed,
      onExportToText,
      onExportToImage,
      onFilenameChange,
      onInclusionsSwitchChanged,
      onInclusionsInput,
      onInclusionsApply,
      onColorPickerOpen,
      onColorPickerClose,
      onColorChange,
    } = this;

    const maxRandomSeed = gridSize.rows * gridSize.columns;
    return (
      <div className="simulator-menu">
        { isPickingColor ?
          <div className="overflow">
            <SketchPicker color={color} onChange={onColorChange} />
            <button className="close-sketch-picker" onClick={onColorPickerClose}><Icon icon={icons.checkmark} size="large" /></button>
          </div> : null }
        <div className="inputs-group">
          <span className="label">INCLUSIONS</span>
          <NumberInput label="Amount" value={amount} onChange={onInclusionsInput('amount')} isRequired isInteger min={1} max={maxRandomSeed} />
          <NumberInput label={!isSquare ? 'Radius' : 'Diagonal'} value={radius} onChange={onInclusionsInput('radius')} isRequired isInteger min={1} max={maxRandomSeed} />
          <Switch checked={!isSquare} labelLeft="Square" labelRight="Circular" onChange={onInclusionsSwitchChanged} />
          <div className="color-picker" style={{background: color}} onClick={onColorPickerOpen} />
          <Button size="small" variant="raised" color="accent" onClick={onInclusionsApply}>Apply</Button>
        </div>
        <div className="inputs-group">
          <span className="label">EXPORTS</span>
          <Input label="File name" value={filename} onChange={onFilenameChange} isRequired/>
          <Button size="small" variant="raised" color="accent" onClick={onExportToText}>Text</Button>
          <Button size="small" variant="raised" color="accent" onClick={onExportToImage}>Image</Button>
        </div>
        <div className="inputs-group">
          <span className="label">CELL SIZE</span>
          <NumberInput label="Height" value={cellSize.height} onChange={onSetCellSize('height')} isRequired isInteger min={1} max={20} />
          <NumberInput label="Width" value={cellSize.width} onChange={onSetCellSize('width')} isRequired isInteger min={1} max={20} />
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
  inclusions: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isPickingColor: PropTypes.bool.isRequired,
    isSquare: PropTypes.bool,
  }).isRequired,
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string,
    ),
  ),
};

const mapStateToProps = (state) => {
  const { cellSize, gridSize, common, grid, inclusions } = getCurrentGrid(state);
  return { cellSize, gridSize, common, grid, inclusions };
};

const mapDispatchToProps = (dispatch) => ({
  setOperation: setOperation(dispatch),
  setCellSize: setCellSize(dispatch),
  setGridSize: setGridSize(dispatch),
  setRandomSeed: setRandomSeed(dispatch),
  saveInclusions: saveInclusions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);