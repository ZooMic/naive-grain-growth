import React, { Component } from 'react';
import GeneralFooter from '../../components/GeneralFooter';
import Navigation from '../Navigation';
import './style.scss';

class MainLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="main-layout">
        <div className="header">
          <GeneralFooter />
          <Navigation />
        </div>
        <div>
          { children }
        </div>
      </div>
    );
  }
}

export default MainLayout;