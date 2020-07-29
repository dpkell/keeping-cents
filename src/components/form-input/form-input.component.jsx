import React from 'react';

import './form-input.styles.scss';

// Transformation for form input with the label transforming to the top once input is typed in.

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
            {
                label ?
                    (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>)
                : null
            }
    </div>
);

export default FormInput;