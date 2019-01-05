import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emptyColor: '#FFF',
    };
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
        ctx.fillRect(item.y * w, item.x * h, w, h);
      });
    }
  }

  clearGrid = () => {
    const {
      canvasRef: canvas,
      canvasContext: ctx,
      state: { emptyColor },
    } = this;
    ctx.fillStyle = emptyColor;
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
    const { onRef } = this.props;
    onRef && onRef(ref);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.clearGrid();
    this.drawGrid();
  }

  onClick = (event) => {
    const canvas = this.canvasRef;
    const { clientX, clientY } = event;
    const { emptyColor } = this.state;
    const { cellSize, data } = this.props;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((clientX - rect.x) / cellSize.width);
    const row = Math.floor((clientY - rect.y) / cellSize.height);
    const { color } = data.find(({ x, y }) => x === row && y === col) || { color: emptyColor };
    this.props.onClick({ row, col, color });
  }

  render() {
    const {
      onRef,
      onClick,
      props: { className, gridSize, cellSize },
    } = this;

    const actualWidth = gridSize.cols * cellSize.width;
    const actualHeight = gridSize.rows * cellSize.height;

    return (
      <div className={className}>
        <div style={{margin: 'auto'}}>
          <canvas
            ref={onRef}
            width={actualWidth}
            height={actualHeight}
            onClick={onClick}
          />
        </div>
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
    cols: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
  })),
  onClick: PropTypes.func,
}

GridCanvas.defaultProps = {
  data: [],
  cellSize: { width: 10, height: 10 },
  gridSize: { rows: 60, cols: 60 },
  onClick: x => x,
}

export default GridCanvas;