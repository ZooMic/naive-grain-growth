import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { setOperation } from '../../actions/current-grid';
import { getCurrentGrid } from '../../selectors/current-grid';
import 'muicss/dist/css/mui.css';
import './style.scss';

class SimulatorMenu extends Component {

  onRunOperationClick = (operationName) => () => {
    this.props.setOperation(operationName);
  }

  render() {

    const {
      cellSize,
      gridSize,
      common: { randomSeed },
    } = this.props;
    const { onRunOperationClick } = this;

    return (
      <div className="simulator-menu">
        <div className="inputs-group">
          <span className="label">CELL SIZE</span>
          <Input label="Width" floatingLabel value={cellSize.width} />
          <Input label="Height" floatingLabel value={cellSize.height} />
        </div>
        <div className="inputs-group">
          <span className="label">GRID SIZE</span>
          <Input label="Rows" floatingLabel value={gridSize.rows} />
          <Input label="Columns" floatingLabel value={gridSize.columns} />
        </div>
        <div className="inputs-group">
          <span className="label">COMMON</span>
          <Input label="Random seed" floatingLabel value={randomSeed} />
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
}

const mapStateToProps = (state) => {
  const { cellSize, gridSize, common } = getCurrentGrid(state);
  return { cellSize, gridSize, common };
};

const mapDispatchToProps = (dispatch) => ({
  setOperation: setOperation(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);