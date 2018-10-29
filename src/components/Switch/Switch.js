import React from 'react';
import PropTypes from 'prop-types';
import ReactSwitch from 'react-switch';
import BemHelper from 'react-bem-helper';
import './Switch.scss';

const bem = BemHelper('Switch');

const Switch = ({ checked, labelLeft, labelRight, onChange }) => {
  const leftModifier = {
    active: !checked,  
  };

  const rightModifier = {
    active: checked,
  };

  return (
    <div {...bem()} >
        <span {...bem('label', leftModifier)}>{labelLeft}</span>
        <ReactSwitch
          uncheckedIcon={null}
          checkedIcon={null}
          checked={checked}
          onChange={onChange}
          offColor='#FF4081'
          onColor='#FF4081'
          height={20}
          handleDiameter={30}
        />
        <span {...bem('label', rightModifier)}>{labelRight}</span>
    </div>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  labelLeft: PropTypes.string,
  labelRight: PropTypes.string,
  onChange: PropTypes.func,
}

Switch.defaultProps = {
  checked: false,
  labelLeft: '',
  labelRight: '',
  onChange: x => x,
}

export default Switch;