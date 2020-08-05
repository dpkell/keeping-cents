import React from 'react';

import { ReactComponent as RemoveIcon } from '../../assets/cross.svg';

import './table-entry.styles.scss'

const DataEntry = ({ description, amount }) => (
    <div className='data-wrapper'>
        <div className='description-container'>
            <p className='description-entry'>
                this is a test for the data entry description and a really long string entry
            </p>
        </div>

        <div className='amount-container'>
            <p className='amount-entry'>
                &#36;3800
            </p>
        </div>

        <div className='remove-button'>
            <RemoveIcon className='remove-icon' type='submit' />
        </div>
    </div>
);

export default DataEntry;