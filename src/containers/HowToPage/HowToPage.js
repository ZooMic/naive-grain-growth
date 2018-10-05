import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import './style.scss';

class HowToPage extends Component {
  render() {
    return (
      <MainLayout>
        <div className="how-to-page">
          <div>How To Page</div>
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

export default HowToPage;