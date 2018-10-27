import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import Switch from '../../components/Switch';
import { NumberInput, Input } from '../../components/Input';
import { setOperation, setCellSize, setGridSize, setRandomSeed } from '../../actions/current-grid';
import { getCurrentGrid } from '../../selectors/current-grid';
import 'muicss/dist/css/mui.css';
import './style.scss';
import debounce from '../../helpers/debounce';
import { getGlobalCanvas } from '../../helpers/globalCanvas';

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

  render() {
    const {
      state: {
        filename,
      },
      props: {
        cellSize,
        gridSize,
        common: { randomSeed }
      },
      onRunOperationClick,
      onSetCellSize,
      onSetGridSize,
      onSetRandomSeed,
      onExportToText,
      onExportToImage,
      onFilenameChange,
    } = this;

    const maxRandomSeed = gridSize.rows * gridSize.columns;
    return (
      <div className="simulator-menu">
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
          <span className="label">INCLUSIONS</span>
          <NumberInput label="Amount" value={1} onChange={x => x} isRequired isInteger min={1} max={maxRandomSeed} />
          <NumberInput label="Radius/Diagonal" value={1} onChange={x => x} isRequired isInteger min={1} max={maxRandomSeed} />
          <Switch checked labelLeft="Square" labelRight="Circular"/>
        </div>
        <div className="inputs-group">
          <span className="label">RUN</span>
          <Button size="small" variant="raised" color="accent" onClick={onRunOperationClick('neumann')}>Neumann</Button>
          <Button size="small" variant="raised" color="accent" onClick={onRunOperationClick('moore')}>Moore</Button>
        </div>
        <div className="inputs-group">
          <span className="label">EXPORTS</span>
          <Input label="File name" value={filename} onChange={onFilenameChange} isRequired/>
          <Button size="small" variant="raised" color="accent" onClick={onExportToText}>Text</Button>
          <Button size="small" variant="raised" color="accent" onClick={onExportToImage}>Image</Button>
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
};

const mapStateToProps = (state) => {
  const { cellSize, gridSize, common, grid, inclusions } = getCurrentGrid(state);
  return { cellSize, gridSize, common, grid, inclusions };
};

const mapDispatchToProps = (dispatch) => ({
  setOperation: setOperation(dispatch),
  setCellSize: setCellSize(dispatch),
  setGridSize: debounce(setGridSize(dispatch), 150),
  setRandomSeed: debounce(setRandomSeed(dispatch), 150),
  // setInclusions: setInclusions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);