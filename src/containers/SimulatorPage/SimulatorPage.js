import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
 
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';
import SimulatorMenu from '../SimulatorMenu';

import procedure from '../../operations/procedure';
import { getCurrentGrid } from '../../selectors/current-grid';
import { setOperation, saveDataGrid } from '../../actions/current-grid';

import './style.scss';

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

  render() {
    const {
      props: { cellSize, gridSize, grid },
      state: { data },
    } = this;

    const currentGrid = data.length === 0 ? grid : data;

    const finalData = [];
    currentGrid.forEach((array, x) => {
      array.forEach((color, y) => {
        if (!!color) {
          finalData.push({x, y, color});
        }
      });
    });

    return (
      <MainLayout>
        <div className="simulator-page">
          <GridCanvas className="simulator-canvas" cellSize={cellSize} gridSize={gridSize} data={finalData} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorPage);