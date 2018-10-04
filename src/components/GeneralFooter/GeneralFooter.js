import React from 'react';
import logo from '../../assets/logo.png';
import './style.scss';

const GeneralFooter = () => (
  <footer className="general-footer">
    <div className="copyright">Copyright &copy; 2017-2018 Marcin Lichota</div>
    <div className="logo">
      <img src={logo} alt="logo"/> <span>NGG</span>
    </div>
  </footer>
);

export default GeneralFooter;