import React from 'react';
import PropTypes from 'prop-types';
import BemHelper from 'react-bem-helper';
import './Icon.scss';

const bem = BemHelper('Icon');

const SIZE = {
  small: 10,
  medium: 16,
  large: 40,
}

const Icon = ({ size, icon }) => (
  <svg
    width={SIZE[size]}
    height={SIZE[size]}
    viewBox={icon.viewBox}
  >
    { icon.paths.map((path, index) => <path key={`icon-path-${index}`} d={path} />) }
  </svg>
);

Icon.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.shape({
    paths: PropTypes.arrayOf(PropTypes.string),
    viewBox: PropTypes.string,
  }).isRequired,
};

Icon.defaultProps = {
  size: 'medium',
}

export default Icon;