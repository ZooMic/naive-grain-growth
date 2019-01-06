import React, { } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'muicss/dist/css/mui.css';
import './styles.scss';
import MonteCarlo from './MonteCarlo';
import Grid from './Grid';



function Menu(props) {

  return (
    <div className='menu'>
      <Grid />
      <MonteCarlo />
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