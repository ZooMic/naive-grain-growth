import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BemHelper from 'react-bem-helper';
import Tooltip from 'rc-tooltip';
import Icon, { icons } from '../Icon';
import { checkRequired } from './helpers'; 
import 'rc-tooltip/assets/bootstrap_white.css';
import './Input.scss';

const bem = BemHelper('Input');

class Input extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      validation: {
        isValid: true,
        message: '',
      },
    };
  }

  componentDidMount() {
    const { value : v } = this.props;
    const value = (v && v.toString) ? v.toString() : '';
    this.setState({
      currentValue: value,
    });
  }

  onChange = (event) => {
    const value = event.target.value;
    const { isRequired, validator, validators } = this.props;
    let validation = { isValid: true, message: '' };

    if (isRequired) {
      validation = checkRequired(value);
    }
    
    if (validator && validation.isValid) {
      validation = validator(value);
    }
    
    if (validators && validators.length > 0 && validation.isValid) {
      validators.forEach(v => {
        const result = v(value);
        const { isValid } = result;
        validation = isValid ? validation : result;
      });
    }

    this.setState({
      currentValue: value,
      validation,
    });
  }

  onFocus = (event) => {
    event.target.select();
  }

  onBlur = () => {
    const {
      state: { currentValue, validation: { isValid } },
      props: { onChange },
    } = this;

    if (isValid) {
      onChange(currentValue);
    }
  }

  render() {
    const {
      state: { currentValue, validation: { isValid, message } },
      props: { label, value },
      onChange, onBlur,
    } = this;

    const invalid = !isValid ? 'invalid' : '';

    return (
      <div {...bem('', invalid)} >
        <div {...bem('label', invalid)}>{label}</div>
        <div {...bem('input', invalid)}>
          <input value={currentValue} onChange={onChange} onBlur={onBlur} />
            { !isValid ? <Tooltip
              placement="left"
              trigger={['click', 'hover']}
              overlay={
                <div {...bem('error')} >
                  {message}<br />Due to the error current used value is "{value}"
                </div>}
          >
            <div {...bem('error-icon')}><Icon icon={icons.warning} /></div>
          </Tooltip> : null }
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isRequired: PropTypes.bool,
  validator: PropTypes.func,
  validators: PropTypes.arrayOf(PropTypes.func),
};

Input.defaultProps = {
  isRequired: false,
  validator: null, 
  validators: [],
};

export default Input;