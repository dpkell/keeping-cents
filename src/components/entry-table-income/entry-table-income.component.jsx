import React from 'react';

import TableTitle from '../table-title/table-title.component';
import DataEntry from '../table-entry/table-entry.component';

import './entry-table-income.styles.scss';

const IncomeEntryTable = ({ type, ...otherProps }) => (
    <div className='income-table'>
        <TableTitle />
        <DataEntry />
    </div>
);

export default IncomeEntryTable;