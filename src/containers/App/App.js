import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import HowToPage from '../HowToPage';
import ImportPage from '../ImportPage';
import SimulatorPage from '../SimulatorPage';
import { getLocation } from '../../selectors/router';
import './style.scss';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <Router location={location}>
        <div className="app">
          <Route path="/" component={HomePage} exact />
          <Route path="/simulator" component={SimulatorPage} />
          <Route path="/import" component={ImportPage} />
          <Route path="/howto" component={HowToPage} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: getLocation(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);