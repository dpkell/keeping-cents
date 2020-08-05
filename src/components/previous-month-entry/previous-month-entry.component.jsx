import React from 'react';

import './previous-month-entry.styles.scss';

const PreviousMonthEntry = () => (
    <div className='previous-entry-container'>
        <button className='previous-entry-btn'>
            <p className='entry-date'>August, 2020</p>
            <p className='entry-total'>&#36;731</p>
        </button>
    </div>
);

export default PreviousMonthEntry;