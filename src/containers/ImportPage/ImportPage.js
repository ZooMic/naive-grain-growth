import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import { NumberInput } from '../../components/Input';
import getGridDataFromImage from './helper/getGridDataFromImage';
// import imageFile from '../../assets/image-file.png';
// import textFile from '../../assets/text-file.png';
import './style.scss';

class ImportPage extends Component {
  constructor(props) {
    super(props);
    this.imageCanvas = null;
    
    this.state = {
      grid: null,
      typeOfInput: null, // one of JSON | IMAGE | NO_MATCH
      cellSize: {
        width: 1,
        height: 1,
      },
    };
  }

  jsonInputHandler = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    let grid = null;
    reader.onload = e => {
      try {
        grid = JSON.parse(e.target.result);
        this.setState({ grid });
      } catch (error) {
        console.error(error);
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
        this.setState({
          grid: getGridDataFromImage(this.imageCanvas, cellSize),
        });
      }
      img.src = e.target.result;
    }
  }

  onFileInputChange = (event) => {
    const files = event.target.files;
    const file = files && files[0];

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

    this.setState({ typeOfInput: 'NO_MATCH' });
  }

  onImageCanvasRef = (node) => {
    if (node) {
      this.imageCanvas = node;
    }
  }

  onInputChange = (parameterName) => (eventValue) => {
    const cellSize = { ...(this.state.cellSize || {}) };
    cellSize[parameterName] = eventValue;
    this.setState({ cellSize });
  }

  render() {
    const {
      onImageCanvasRef, onInputChange, onFileInputChange,
      state: { cellSize, typeOfInput },
    } = this;

    return (
      <MainLayout>
        <div className="import-page">
          <div className="import">
            <h3>Import file</h3>
            <input type="file" id="input" onChange={onFileInputChange} />
            <canvas className="display-none" ref={onImageCanvasRef} />
          </div>
          
          { typeOfInput === 'IMAGE' ?
            <div className="image-import">
              <span>Image import require you to set cell size that you expect to gain from the image.</span>
              <span>You can allways check interpretation of inported image on the preview.</span>
              <div className="input-groupe">
                <span className="label">CELL SIZE</span>
                <NumberInput label="Width" value={cellSize.width} onChange={onInputChange('width')} isRequired isInteger min={1} max={100} />
                <NumberInput label="Height" value={cellSize.height} onChange={onInputChange('height')} isRequired isInteger min={1} max={100} />
              </div>
            </div> : null }
          { typeOfInput === 'IMAGE' || typeOfInput === 'JSON' ?
            <div className="preview">
            </div> : null }

          { typeOfInput === 'NO_MATCH' ?
            <div className="no-match-import">
              <span>This file type is not supported.</span>
            </div> : null }
        </div>
      </MainLayout>
    );
  }
}

export default ImportPage;