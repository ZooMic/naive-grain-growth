import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { factoryCheckMinMax, checkIfInteger} from './helpers'

const NumberInput = (props) => {
  const {
    label,
    value,
    onChange,
    isRequired,
    validators,
    validator,
    min,
    max,
    isInteger,
    disabled,
  } = props;
  
  const fullValidators = [...validators];
  if (min !== false && max !== false) {
    fullValidators.push(factoryCheckMinMax(min, max));
  }
  if (isInteger) {
    fullValidators.push(checkIfInteger);
  }

  return (
    <Input
      label={label}
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      validators={fullValidators}
      validator={validator}
      disabled={disabled}
    />
  );
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isRequired: PropTypes.bool,
  validator: PropTypes.func,
  validators: PropTypes.arrayOf(PropTypes.func),
  min: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isInteger: PropTypes.bool,
  disabled: PropTypes.bool,
};

NumberInput.defaultProps = {
  isRequired: false,
  validator: null, 
  validators: [],
  min: false,
  max: false,
  isInteger: false,
  disabled: false,
};

export default NumberInput;
