import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
    const { match: { path: pathname } } = this.props;
    return (
      <div className="navigation">
        {
          routes.map(({ text, path, icon }) => (
            <Link className="navigation-link" to={path} key={`${text}-icon-key`}>
              <IconButton icon={icon} text={text} active={pathname === path}/>
            </Link>
          ))
        }
      </div>
    );
  }
}

export default withRouter(Navigation);