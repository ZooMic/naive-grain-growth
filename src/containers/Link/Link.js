import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLocation } from '../../actions/router';
import { getLocation } from '../../selectors/router';

class Link extends Component {
  render() {
    const { changeLocation, to, children, className } = this.props;
    return (
      <a href={to} onClick={changeLocation} className={className}>{children}</a>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: getLocation(state),
});

const mapDispatchToProps = (dispatch, { to }) => ({
  changeLocation: (event) => {
    // event.preventDefault();
    return dispatch(changeLocation(to));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);