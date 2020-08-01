import React from 'react';

import './dashboard-expense-display.styles.scss';


const DisplayExpense = ({expenseTotal}) => (
    <div className='expense-display-container'>
        <span className='expense-subheading'>Total expenses this month:</span>
        <div className='display-expense'>
            <h1 className='expense-total'>-$2,623.00</h1>
        </div>
    </div>
    
)

export default DisplayExpense;