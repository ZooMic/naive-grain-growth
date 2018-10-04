import React from 'react';
import arrow from '../../assets/arrow-up.png';
import './style.scss';

const IconButton = ({icon, text, active}) => (
  <button className={`icon-button ${active ? 'active' : ''}`}>
    <img className="icon" src={icon} alt="" />
    <div className="text">{text}</div>
    <img className="arrow" src={arrow} alt="" />
  </button>
);

export default IconButton;