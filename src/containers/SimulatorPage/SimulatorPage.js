import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import GridCanvas from '../../components/GridCanvas';
import defaultConfig from './helpers/default-config';
import './style.scss';

class SimulatorPage extends Component {
  render() {
    return (
      <MainLayout>
        <div className="simulator-page">
          <GridCanvas className="simulator-canvas"/>
          <div className="simulator-menu">
            Menu
          </div> 
        </div>
      </MainLayout>
    );
  }
}

export default SimulatorPage;