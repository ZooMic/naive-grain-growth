import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridCanvas extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = null;
    this.canvasContext = null;
    this.resizeTimeout = null;
  }
  
  drawGrid = () => {
    const {
      canvasContext : ctx,
      props: { data, cellSize: { width: w, height: h } },
    } = this;

    if (ctx) {
      data.forEach((item) => {
        ctx.fillStyle=item.color;
        ctx.fillRect(item.x * w, item.y * h, w, h);
      });
    }
  }

  clearGrid = () => {
    const {
      canvasRef: canvas,
      canvasContext: ctx,
    } = this;
    ctx.fillStyle="#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  onResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      const { canvasRef } = this;
      if (!canvasRef) {
        return null;
      }

      this.clearGrid();
      this.drawGrid();
    }, 150);
  }

  onRef = (ref) => {
    if (!ref) {
      return;
    }
    this.canvasRef = ref;
    this.canvasContext = ref.getContext('2d');
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.clearGrid();
    this.drawGrid();
  }

  render() {
    const {
      onRef,
      props: { className, gridSize, cellSize },
    } = this;

    const actualWidth = gridSize.columns * cellSize.width;
    const actualHeight = gridSize.rows * cellSize.height;

    return (
      <div className={className}>
        <canvas
          ref={onRef}
          width={actualWidth}
          height={actualHeight}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.clearGrid();
    this.drawGrid();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}

GridCanvas.propTypes = {
  cellSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  gridSize: PropTypes.shape({
    rows: PropTypes.number,
    columns: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
  })),
}

GridCanvas.defaultProps = {
  data: [],
  cellSize: { width: 10, height: 10 },
  gridSize: { rows: 60, columns: 60 },
}

export default GridCanvas;