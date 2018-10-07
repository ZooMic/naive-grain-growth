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
      props: { className, size, cellSize },
    } = this;

    const actualWidth = size.width * cellSize.width;
    const actualHeight = size.height * cellSize.height;

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
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
  })),
}

GridCanvas.defaultProps = {
  data: [
    {x: 0, y: 0, color: '#FF0'},
    {x: 1, y: 1, color: '#CCC'},
    {x: 2, y: 2, color: '#CCC'},
    {x: 3, y: 3, color: '#CCC'},
    {x: 4, y: 4, color: '#CCC'},
    {x: 5, y: 5, color: '#CCC'},
    {x: 6, y: 6, color: '#CCC'},
    {x: 6, y: 7, color: '#AAA'},
    {x: 6, y: 8, color: '#888'},
    {x: 6, y: 9, color: '#CCC'},
    {x: 20, y: 20, color: '#CCC'},
    {x: 30, y: 30, color: '#CCC'},
    {x: 40, y: 40, color: '#CCC'},
    {x: 50, y: 50, color: '#CCC'},
    {x: 60, y: 60, color: '#CCC'},
    {x: 70, y: 70, color: '#CCC'},
    {x: 98, y: 98, color: '#CCC'},
    {x: 98, y: 99, color: '#CCC'},
    {x: 99, y: 99, color: '#CCC'},
  ],
  cellSize: { width: 10, height: 10 },
  size: { width: 50, height: 50 },
}

export default GridCanvas;