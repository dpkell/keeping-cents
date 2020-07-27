import React from 'react';

import IncomeEntryTable from '../entry-table-income/entry-table-income.component';
import ExpensesEntryTable from '../entry-table-expenses/entry-table-expenses.component';

import './entry-table-overview.styles.scss';

const EntryTableOverview = () => (
    <div className='table-overview'>
        <ExpensesEntryTable />
        <IncomeEntryTable />
    </div>
);

export default EntryTableOverview;