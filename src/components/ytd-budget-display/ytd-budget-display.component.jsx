import React from 'react';

import './ytd-budget-display.styles.scss';

const YtdBudgetDisplay = ({ year, total }) => (
    <div className='ytd-display'>
        <span className='ytd-text'>Total for {year}</span>
        <h3 className='yearly-total'>
            Total Placeholder
        </h3>
        
    </div>
);

export default YtdBudgetDisplay;