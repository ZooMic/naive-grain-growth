import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import './style.scss';

class SimulatorPage extends Component {
  render() {
    return (
      <MainLayout>
        <div className="simulator-page">
          <div>Simulator Page</div>
          {/* <Simulator simulator state/> */}
          {/* <Menu /> */}
        </div>
      </MainLayout>
    );
  }
}

export default SimulatorPage;