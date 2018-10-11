/**
 * required parameters
 * - validation - function for validation string (state.value, setState) => (setState({valid: true|false, errorMsg: ""}))
 * - required | notEmpty
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMUI from 'muicss/lib/react/input';
import checkRequired from './helpers'; 

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: '',
      currentValue: '',
      validation: {
        isValid: true,
        msg: '',
      },
    };
  }

  static getDerivedStateFromProps(props) {
    const { value } = props;
    return {
      defaultValue: value,
    }
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      currentValue: value,
    });
  }

  onFocus = () => {
    const { currentValue, defaultValue, validation: { isValid } } = this.state;
    this.setState({
      currentValue: isValid ? defaultValue : currentValue,
    });
  }

  onBlur = () => {
    const { currentValue } = this.state;
    const { isValid, message } = checkRequired(currentValue);
    const { onChange, isRequired } = this.props;
    if (isValid) {
      this.setState({

      });
    } else {

    }
  }

  render() {
    return null;
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  validation: PropTypes.func,
};

Input.defaultProps = {
  isRequired: false,
  validation: null, 
};

export default Input;
