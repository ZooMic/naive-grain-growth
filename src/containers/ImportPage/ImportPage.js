import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import MainLayout from '../MainLayout';
import { NumberInput } from '../../components/Input';
import GridCanvas from '../../components/GridCanvas';
import { saveDataGrid, setCellSize, setGridSize } from '../../actions/current-grid';
import store from '../../reducers';
import getGridDataFromImage from './helper/getGridDataFromImage';
import gridToData from '../../helpers/gridToData';
import { withRouter } from 'react-router-dom';
import './style.scss';

class ImportPage extends Component {
  constructor(props) {
    super(props);
    this.imageCanvas = null;
    this.dropTarget = null;
    
    this.state = {
      correctGrid: null,
      grid: null,
      data: null,
      typeOfInput: null, // one of JSON | IMAGE | NO_MATCH if null - no file selected
      cellSize: {
        width: 1,
        height: 1,
      },
      gridSize: null,
      error: null,
    };
  }

  exportGridToData = () => {
    const { typeOfInput, cellSize, grid } = this.state;
    let data = null;
    let gridSize = { rows: 0, columns: 0 };
    let newGrid = null;

    if (typeOfInput === 'JSON') {
      data = gridToData(grid);
      gridSize.rows = !!grid ? grid.length : 0;
      gridSize.columns = (!!grid && grid.length > 0) ? grid[0].length : 0;
      newGrid = grid;
    } else {
      newGrid = [];
      let row = 0;
      
      for (let i = 0; i < grid.length; i+= cellSize.height) {
        newGrid.push([]);
        for (let j = 0; j < grid[i].length; j += cellSize.width) {
          newGrid[row].push(grid[i][j]);
        }
        row += 1;
      }

      data = gridToData(newGrid);
      gridSize.rows = !!newGrid ? newGrid.length : 0;
      gridSize.columns = (!!newGrid && newGrid.length > 0) ? newGrid[0].length : 0;

    }

    this.setState({ data, gridSize, correctGrid: newGrid });
  }

  jsonInputHandler = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    let grid = null;
    reader.onload = e => {
      try {
        grid = JSON.parse(e.target.result);
        this.setState({ grid }, () => {
          this.exportGridToData();
        });
      } catch (error) {
        this.setState({error});
      }
    }
  }

  imageInputHandler = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    const { cellSize } = this.state;
    const ctx = this.imageCanvas.getContext("2d"); 
    const img = new Image();

    reader.onload = e => {
      img.onload = () => {
        const { height, width } = img;
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.drawImage(img, 0, 0);
        const grid = getGridDataFromImage(this.imageCanvas, cellSize);
        this.setState({ grid }, () => {
          this.exportGridToData();
        });
      }
      img.src = e.target.result;
    }
  }

  onFileInputChange = (event) => {
    const file = event && event[0];
    this.setState({ error: null, grid: null });
    try {
      if (file.type.includes('json')) {
        this.jsonInputHandler(file);
        this.setState({ typeOfInput: 'JSON' });
        return;
      }
  
      if (file.type.includes('image')) {
        this.imageInputHandler(file);
        this.setState({ typeOfInput: 'IMAGE' });
        return;
      }
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ typeOfInput: 'NO_MATCH' });
  }

  onImageCanvasRef = (node) => {
    if (node) {
      this.imageCanvas = node;
    }
  }

  onDropTargetRef = (node) => {
    if (node) {
      this.dropTarget = node;
    }
  }

  onInputChange = (parameterName) => (eventValue) => {
    const cellSize = { ...(this.state.cellSize || {}) };
    cellSize[parameterName] = Number(eventValue);
    this.setState({ cellSize }, () => {
      this.exportGridToData();
    });
  }

  onCancel = () => {
    this.setState({
      grid: null,
      data: null,
      typeOfInput: null,
      gridSize: null,
      error: null,
    });
  }

  onSave = () => {
    const { correctGrid, gridSize, cellSize } = this.state;
    const { history } = this.props;
    const { dispatch } = store;
    saveDataGrid(dispatch)(correctGrid);
    setGridSize(dispatch)(gridSize);
    setCellSize(dispatch)(cellSize);
    history.push('/simulator');
  }

  render() {
    const {
      onImageCanvasRef, onInputChange, onFileInputChange, onCancel, onSave,
      state: { cellSize, typeOfInput, error, grid, data, gridSize },
    } = this;

    const isCorrectlyImported = grid !== null && error === null && data !== null;
    
    return (
      <MainLayout>
        <div className="import-page">
          { !isCorrectlyImported ? <FileDrop
            onDrop={onFileInputChange}
            className="file-drop"
            targetClassName="file-drop-target"
            draggingOverFrameClassName="file-drop-dragging-over-frame"
          >
            <h3>Import file</h3>
          </FileDrop> : null }
          <canvas className="no-display" ref={onImageCanvasRef} />

          { isCorrectlyImported ? <div className="after-import">
            <div className="import-header">{typeOfInput === 'JSON' ? "JSON import" : "Image import"}</div>
            <div className="input-and-buttons-wrapper">
              <div className="input-group">
                <span className="label">CELL SIZE</span>
                <NumberInput label="Width" value={cellSize.width} onChange={onInputChange('width')} isRequired isInteger min={1} max={100} />
                <NumberInput label="Height" value={cellSize.height} onChange={onInputChange('height')} isRequired isInteger min={1} max={100} />
              </div>
              <div className="buttons-group">
                <button className="cancel" onClick={onCancel} />
                <button className="save" onClick={onSave} />
              </div>
            </div>
            <GridCanvas
            className="preview"
            data={data}
            cellSize={cellSize}
            gridSize={gridSize}
            />
          </div> : null }

          { typeOfInput === 'NO_MATCH' ?
            <div className="error">
              <span>This file type is not supported.</span>
            </div> : null }

          { error ?
            <div className="error">
              <span>{error.message}</span>
            </div> : null }

        </div>
      </MainLayout>
    );
  }
}

export default withRouter(ImportPage);