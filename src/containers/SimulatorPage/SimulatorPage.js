import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
 
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';
import SimulatorMenu from '../SimulatorMenu';

import procedure from '../../operations/procedure';
import { getCurrentGrid } from '../../selectors/current-grid';
import { setOperation, saveDataGrid, saveInclusions } from '../../actions/current-grid';
import { setGlobalCanvas } from '../../helpers/globalCanvas';

import './style.scss';
import gridToData from '../../helpers/gridToData';

class SimulatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duringProcedure: false,
      data: [],
    };
  }

  componentDidMount() {
    this.shouldStartProcedure();
  }

  shouldStartProcedure = () => {
    const {
      state: { duringProcedure },
      props: {
        gridSize,
        common: { randomSeed },
        operationName,
      },
      onFinish, onRefresh,
    } = this;

    if (!duringProcedure && operationName !== '') {
      procedure({
        randomSeed,
        neighborhood: operationName,
        refreshTime: 10000,
        gridSize,
        onFinish,
        onRefresh,
      });
      this.setState({
        duringProcedure: true,
      });
    }
  }

  onFinish = (data) => {
    this.props.setOperation('');
    this.props.saveDataGrid(data);
    this.setState({
      data,
      duringProcedure: false,
    });
  }

  onRefresh = (data) => {
    this.setState({
      data,
    });
  }

  onRef = (node) => {
    if (node) {
      setGlobalCanvas(node);
    }
  }

  onColorPick = ({ color }) => {
    const { isPickingColor } = this.props.inclusions;
    if (isPickingColor) {
      this.props.saveInclusions({
        ...this.props.inclusions,
        color,
      });
    }
  }

  render() {
    const {
      props: { cellSize, gridSize, grid, inclusions: { isPickingColor } },
      state: { data },
      onRef,
      onColorPick,
    } = this;

    const currentGrid = data.length === 0 ? grid : data;
    const finalData = gridToData(currentGrid);

    return (
      <MainLayout>
        <div className="simulator-page">
          <GridCanvas className={`simulator-canvas ${isPickingColor ? 'picking-color' : ''}`} cellSize={cellSize} gridSize={gridSize} data={finalData} onRef={onRef} onClick={onColorPick} />
          <SimulatorMenu />
        </div>
      </MainLayout>
    );
  }

  componentDidUpdate() {
    this.shouldStartProcedure();
  }
}

SimulatorPage.propTypes = {
  dataGrid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string,
    ),
  ),
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
  operationName: PropTypes.string,
  inclusions: PropTypes.shape({
    color: PropTypes.string.isRequired,
    isPickingColor: PropTypes.bool.isRequired,
  }).isRequired,
}

SimulatorPage.defaultProps = {
  dataGrid: [],
  operationName: '',
}

const mapStateToProps = (state) => {
   return getCurrentGrid(state);
};

const mapDispatchToProps = (dispatch, prop) => ({
  setOperation: setOperation(dispatch),
  saveDataGrid: saveDataGrid(dispatch),
  saveInclusions: saveInclusions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorPage);