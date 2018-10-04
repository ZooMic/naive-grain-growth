import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from '../Link';
import { getLocation } from '../../selectors/router';

import IconButton from '../../components/IconButton';
import homeIcon from '../../assets/home-icon.png';
import simulatorIcon from '../../assets/grid-icon.png';
import importIcon from '../../assets/import-icon.png';
import questionIcon from '../../assets/question-icon.png';
import './style.scss';

const routes = [{
  text: 'HOME',
  path: '/',
  icon: homeIcon,
}, {
  text: 'SIMULATOR',
  path: '/simulator',
  icon: simulatorIcon,
}, {
  text: 'IMPORT',
  path: '/import',
  icon: importIcon,
}, {
  text: 'HOW TO',
  path: '/howto',
  icon: questionIcon,
}];

class Navigation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="navigation">
        {
          routes.map(({ text, path, icon }) => (
            <Link to={path} key={`${text}-icon-key`}>
              <IconButton icon={icon} text={text} active={location === path}/>
            </Link>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: getLocation(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);