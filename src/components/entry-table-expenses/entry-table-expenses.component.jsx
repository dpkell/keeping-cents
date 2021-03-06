import React from 'react';

import TableTitle from '../table-title/table-title.component';

import './entry-table-expenses.styles.scss';

const ExpensesEntryTable = () => (
    <div className='expenses-table'>
        <TableTitle isExpense />
    </div>
);

export default ExpensesEntryTable;