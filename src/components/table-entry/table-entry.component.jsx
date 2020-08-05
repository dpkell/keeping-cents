import React from 'react';

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
    </div>
);

export default DataEntry;