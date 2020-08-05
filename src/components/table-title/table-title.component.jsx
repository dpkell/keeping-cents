import React from 'react';

import './table-title.styles.scss';

const TableTitle = ({type, isExpense}) => (
    <div className={`${isExpense ? 'is-expense' : '' } title-container`}>
        <h2 className='title'>Table Title</h2>
    </div>
);

export default TableTitle;