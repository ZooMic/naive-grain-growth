import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import HowToPage from '../HowToPage';
import ImportPage from '../ImportPage';
import SimulatorPage from '../SimulatorPage';
import './style.scss';

const App = () => (
  <Router>
    <div className="app">
      <Route path="/" component={HomePage} exact />
      <Route path="/simulator" component={SimulatorPage} />
      <Route path="/import" component={ImportPage} />
      <Route path="/howto" component={HowToPage} />
    </div>
  </Router>
);

export default App;