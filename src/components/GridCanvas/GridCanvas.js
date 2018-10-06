import React, { Component } from 'react';

class GridCanvas extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = null;
    this.resizeTimeout = null;
  }
  
  onResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      const { canvasRef } = this;
      if (!canvasRef) {
        console.log("CANVAS NULL");
        return null;
      }

      const { width, height } = canvasRef.getBoundingClientRect();
      console.log("BOUNDS", width, 'x', height);
    }, 150);
  }

  onRef = (ref) => {
    window.addEventListener('resize', this.onResize);
    this.canvasRef = ref;
    this.onResize();
  }

  render() {
    const {
      onRef,
      props: { className },
    } = this;

    return <canvas className={className} ref={onRef} />
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}

export default GridCanvas;