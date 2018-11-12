import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import MainLayout from '../MainLayout';
import { NumberInput } from '../../components/Input';
import GridCanvas from '../../components/GridCanvas';
import { setGridData } from '../../actions/gridData';
import store from '../../reducers';
import getGridDataFromImage from './helper/getGridDataFromImage';
import { gridToColorArray } from '../../helpers/gridToData';
import createGrid from '../../helpers/createGrid';
import { withRouter } from 'react-router-dom';
import './style.scss';

class ImportPage extends Component {
  constructor(props) {
    super(props);
    this.imageCanvas = null;
    this.dropTarget = null;
    this.inputTarget = null;
    
    this.state = {
      dataGrid: { 
        cellSize: { width: 1, height: 1 },
        gridSize: null,
        grid: null,
        colorsMap: null,
      },
      isInitialized: false, // one of JSON | IMAGE | NO_MATCH if null - no file selected
      error: null,
      typeOfInput: null,
      currentGrid: {
        data: null,
        cellSize: null,
        gridSize: null,
        isInitialized: false,
      },
    };
  }

  exportGridToData = () => {
    const { 
      dataGrid: { colorsMap, grid, ...rest },
      typeOfInput,
    } = this.state;
    let data = null;
    const { cellSize, gridSize } = rest;
    if (typeOfInput === "JSON") {
      data = gridToColorArray(grid, colorsMap);
      this.setState({ 
        currentGrid: { data, gridSize, cellSize, isInitialized: true },
      });
    } else {
      data = gridToColorArray(grid, colorsMap, cellSize);
      this.setState({ 
        currentGrid: {
          data,
          gridSize: {
            row: gridSize.row / cellSize.height,
            col: gridSize.col / cellSize.width,
          },
          cellSize,
          isInitialized: true,
        },
      });
    }
  }

  jsonInputHandler = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    let dataGrid = null;
    reader.onload = e => {
      try {
        dataGrid = JSON.parse(e.target.result);
        this.setState({ dataGrid, isInitialized: true }, () => {
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
    const { cellSize } = this.state.dataGrid;
    const ctx = this.imageCanvas.getContext("2d");
    const img = new Image();

    reader.onload = e => {
      img.onload = () => {
        const { height, width } = img;
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.drawImage(img, 0, 0);
        const dataGrid = getGridDataFromImage(this.imageCanvas, cellSize);
        
        this.setState({ dataGrid, isInitialized: true }, () => {
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
    const dataGrid = this.state.dataGrid || {};
    const cellSize = { ...(dataGrid.cellSize || {}) };
    cellSize[parameterName] = Number(eventValue);
    this.setState({ dataGrid: { ...dataGrid, cellSize } }, () => {
      this.exportGridToData();
    });
  }

  onCancel = () => {
    this.setState({
      dataGrid: {
        cellSize: { width: 1, height: 1 },
      },
      isInitialized: false,
      error: null,
      typeOfInput: null,
      currentGrid: {
        data: null,
        cellSize: null,
        gridSize: null,
        isInitialized: false,
      }
    });
  }

  onSave = () => {
    const { colorsMap } = this.state.dataGrid;
    const colorsIdsMap = {};
    for (const key in colorsMap) {
      colorsIdsMap[colorsMap[key]] = key;
    }

    const { cellSize, gridSize, data } = this.state.currentGrid;
    const grid = createGrid(gridSize.row, gridSize.col);
    data.forEach(({x, y, color}) => {
      grid[x][y] = Number(colorsIdsMap[color]);
    });
    setGridData(store.dispatch)({ ...this.state.dataGrid, grid, cellSize, gridSize, initialized: true });
    this.props.history.push('/simulator');
  }

  onInputRef = (node) => {
    if (node) {
      this.inputTarget = node;
    }
  }

  onFileInputChanged = (event) => {
    this.onFileInputChange(event.target.files);
  }

  onDragDropClick = (event) => {
    if (this.state.isInitialized) {
      return null;
    }
    const { inputTarget } = this;
    inputTarget.click();
  }

  render() {
    const {
      onImageCanvasRef, onInputChange, onFileInputChange, onCancel, onSave, onDragDropClick, onInputRef, onFileInputChanged,
      state: { currentGrid, typeOfInput, error },
    } = this;
    const { cellSize, gridSize, data, isInitialized } = currentGrid;

    return (
      <MainLayout>
        <div className="import-page" onClick={onDragDropClick} >
          { !isInitialized ? <FileDrop
            onDrop={onFileInputChange}
            className="file-drop"
            targetClassName="file-drop-target"
            draggingOverFrameClassName="file-drop-dragging-over-frame"
          >
            <h3>Import file</h3>
          </FileDrop> : null }
          { !isInitialized ? <input type="file" className="no-display" ref={onInputRef} onChange={onFileInputChanged} /> : null }
          <canvas className="no-display" ref={onImageCanvasRef} />

          { isInitialized ? <div className="after-import">
            <div className="import-header">
              {typeOfInput === 'JSON' ? "JSON import" : "Image import"}
              <div className="ImportPage__buttons-group">
                <button className="cancel" onClick={onCancel} />
                <button className="save" onClick={onSave} />
              </div>
            </div>
            <div className="input-and-buttons-wrapper">
            { typeOfInput !== 'JSON' ? <div className="input-group">
                <span className="label">CELL SIZE</span>
                <NumberInput label="Width" value={cellSize.width} onChange={onInputChange('width')} isRequired isInteger min={1} max={100} />
                <NumberInput label="Height" value={cellSize.height} onChange={onInputChange('height')} isRequired isInteger min={1} max={100} />
              </div> : null }
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