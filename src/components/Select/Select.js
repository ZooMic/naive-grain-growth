import React from 'react';
import './styles.scss';

function Select ({ disabled, onChange, children, defaultValue }) {
    return (
        <select className='custom-select' disabled={disabled === undefined ? false : disabled} onChange={onChange} defaultValue={defaultValue}>
            {children}
        </select>
    );
}

export default Select;