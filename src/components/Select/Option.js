import React from 'react';

function Option ({ value, label, selected }) {
    return (
        <option value={value} selected={selected !== undefined ? selected : false}>
            {label}
        </option>
    );
}

export default Option;