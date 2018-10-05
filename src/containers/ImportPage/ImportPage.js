import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import './style.scss';

class ImportPage extends Component {
  render() {
    return (
      <MainLayout>
        <div className="import-page">
          <div>Import Page</div>
          {/* <Header> */}
          {/* // <Navigation basic header props - the best it would be to get it from the state or maybe not/> */}
          {/* </Header> */}
          {/* <Simulator simulator state/> */}
          {/* <Menu /> */}
        </div>
      </MainLayout>
    );
  }
}

export default ImportPage;