import React from 'react';

import './dashboard-income-display.styles.scss';


const DisplayIncome = ({incomeTotal}) => (
    <div className='income-display-container'>
        <span className='income-subheading'>Total income this month:</span>
        <div className='display-income'>
            <h1 className='income-total'>+$3,860.00</h1>
        </div>
    </div>
    
)

export default DisplayIncome;