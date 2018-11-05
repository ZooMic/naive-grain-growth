import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { SketchPicker } from 'react-color';
import Icon, { icons } from '../Icon';
import './ColorPicker.scss';

const bem = BEMHelper('ColorPicker');

const ColorPicker = ({ color, onChange, onClose, isVisible }) => (
  <div {...bem('', { isVisible })}>
    <SketchPicker color={color} onChange={onChange} />
    <button {...bem('close-btn')} onClick={onClose}>
      <Icon icon={icons.checkmark} size="large" />
    </button>
  </div>
);

ColorPicker.propTypes = {
    isVisible: PropTypes.bool,
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  isVisible: true,
};

export default ColorPicker;

