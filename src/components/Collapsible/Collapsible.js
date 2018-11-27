import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { outer, inner, actionBtn, collapsed } from './Collapsible.module.scss';


class Collapsible extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
  }

  changeCollapsed = () => {
    const { isCollapsed } = this.state;
    this.setState({
      isCollapsed: !isCollapsed,
    });
  }

  render() {
    const {
      state: { isCollapsed },
      props: { className, children },
      changeCollapsed,
    } = this;

    return (
      <div className={`${outer} ${className}`}>
        <div className={`${inner} ${isCollapsed ? collapsed : ''}`}>
          {children}
        </div>
        <button className={actionBtn} onClick={changeCollapsed}>
          { isCollapsed ? "Menu" : "Hide"}
        </button>
      </div>
    );
  }
};

Collapsible.propTypes = {
  className: PropTypes.string,
};

Collapsible.defaultProps = {
  className: '',
};

export default Collapsible;

