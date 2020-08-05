import React from 'react';

import './toggle-switch.styles.scss';

const ToggleSwitch = ({toggleLabel, isOn, handleToggle, onColor, toggleId}) => (
    <div className='toggle-wrapper'>
        <span className='label'>{toggleLabel}</span>
        <input
            type='checkbox'
            checked={isOn}
            onChange={handleToggle}
            className='switch-checkbox'
            id={`${toggleId}`}
            
        />
        <label
            style={{background: isOn && onColor}}
            className='switch-label'
            htmlFor={`${toggleId}`}
        >
            <span className={`switch-button`} />
        </label>
    </div>
);

export default ToggleSwitch;