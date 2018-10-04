import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from '../Link';
import './style.scss';

class HomePage extends Component {
  render() {
    return (
      <Router>
        <div className="home-page">
          <footer>Copyright &copy; 2017-2018 Marcin Lichota</footer>
          <div className="links">
            <Link className="link link-1" to="/simulator">CREATE NEW PROJECT</Link>
            <Link className="link link-2" to="/import">IMPORT PROJECT</Link>
            <Link className="link link-3" to="/howto">HOW TO</Link>
          </div>
          <header>
            <h1>Naive Grain Growth</h1>
            <h3>Project created for the Multiscale Modeling.</h3>
          </header>
        </div>
      </Router>
    );
  }
}

export default HomePage;