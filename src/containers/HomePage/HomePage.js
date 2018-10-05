import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GeneralFooter from '../../components/GeneralFooter';
// import Link from '../Link';
import './style.scss';

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <GeneralFooter />
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
    );
  }
}

export default HomePage;