import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import 'muicss/dist/css/mui.css';
import './style.scss';
import { neumannProcedure, mooreProcedure, clearGrid, moore2Procedure } from '../../operations/procedure';
import Inclusions from './Inclusions';
import GridData from './GridData';
import Export from './Export';
import Boundary from './Boundary';
import GrainsSelection from './GrainsSelection';
import MonteCarlo from './MonteCarlo';
import { getGridData } from '../../selectors/gridData';

class SimulatorMenu extends Component {
  render() {
    const { initialized } = this.props;

    return (
      <div className="simulator-menu">
        <div className="inputs-group">
          <span className="label">INCLUSIONS</span>
          <Inclusions />
        </div>
        <div className="inputs-group">
          <span className="label">GRID DATA</span>
          <GridData />
        </div>
        <div className="inputs-group">
          <span className="label">EXPORTS</span>
          <Export />
        </div>
        <div className="inputs-group">
          <span className="label">RUN</span>
          <Button size="small" variant="raised" color="accent" onClick={clearGrid}>Clear</Button>
          <Button size="small" variant="raised" color="accent" onClick={neumannProcedure} disabled={initialized}>Neumann</Button>
          <Button size="small" variant="raised" color="accent" onClick={mooreProcedure} disabled={initialized}>Moore</Button>
          <Button size="small" variant="raised" color="accent" onClick={moore2Procedure} disabled={initialized}>Moore2</Button>
        </div>
        <div className="inputs-group">
          <span className="label">GRAINS SELECTION</span>
          <GrainsSelection />
        </div>
        <div className="inputs-group">
          <span className="label">BOUNDARIES</span>
          <Boundary />
        </div>
        <div className="inputs-group">
          <span className="label">MONTE CARLO</span>
          <MonteCarlo />
        </div>
      </div>
    );
  }
}

SimulatorMenu.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string,
    ),
  ),
};

const mapStateToProps = (state) => {
  const { initialized } = getGridData(state);
  return { initialized };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorMenu);