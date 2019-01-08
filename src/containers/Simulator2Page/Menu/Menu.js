import React, { } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'muicss/dist/css/mui.css';
import './styles.scss';
import MonteCarlo from './MonteCarlo';
import Grid from './Grid';
import EnergyDistribution from './EnergyDistribution';
import CellularAutomata from './CellularAutomata';
import Selection from './Selection';



function Menu(props) {

  return (
    <div className='menu'>
      <Grid />
      <CellularAutomata />
      <MonteCarlo />
      <EnergyDistribution />
      <Selection />
    </div>
  );
}

Menu.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);