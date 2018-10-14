import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import MainLayout from '../MainLayout';

// import imageFile from '../../assets/image-file.png';
// import textFile from '../../assets/text-file.png';
import './style.scss';

class ImportPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageTargetInitialized: false,
      fileTargetInitialized: false,
    }

    this.fileTarget = null;
    this.imageTarget = null;

    this.imageCanvas = null;
    this.textCanvas = null;
  }

  onDrop = (event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;
    if (items && items.length > 0) {
      const file = items[0].getAsFile();
      const isImage = file.type.includes('image');
      if (isImage) {
        var reader  = new FileReader();
        
        // const url = reader.readAsDataURL(file);
        // const objectURL = URL.createObjectURL(file);
        // const image = new Image();
        // image.src = url;
        // const ctx = this.imageCanvas.getContext("2d");
        // ctx.drawImage(image, 100, 100);
        // console.log("url", file);
      }
    }
  }

  onFrameDragEnter = (event) => {
    console.log("onFrameDragEnter", event);
  }

  onRef = (refName) => (node) => {
    if (node && this[refName] !== node) {
      this[refName] = node;
      this.setState({
        [`${refName}Initialized`]: true,
      });
    }
  }

  onCanvasRef = (refName) => (node) => {
    if (node) {
      this[refName] = node;
    }
  }

  render() {
    const {
      onRef,
      onCanvasRef,
      fileTarget,
      imageTarget,
      onDrop,
      onFrameDragEnter,
      state: { imageTargetInitialized, fileTargetInitialized },
    } = this;

    console.log("IMAGE TARGET", imageTargetInitialized, imageTarget, this);

    return (
      <MainLayout>
        <div className="import-page">
          <div className="parameters">
            <h3>Specify basic parameters for the uploaded file</h3>
          </div>
          <div className="text-import">
            <h3>Import text file</h3>
            {/* <img src={textFile} alt="" /> */}
          </div>
          <div className="image-import">
            <h3>Import image</h3>
            {/* <img src={imageFile} alt="" /> */}
            <div className="image-import-content" ref={onRef('imageTarget')} >
              { imageTargetInitialized ?
                <FileDrop onFrameDrop={onDrop} onFrameDragEnter={onFrameDragEnter} frame={imageTarget} dropEffect="link" />
                : null }
            </div>
            <canvas ref={onCanvasRef('imageCanvas')} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default ImportPage;