import React from 'react';

import './dashboard-date.styles.scss';

const DashboardDate = ({month, year}) => (
    <div className='date-container'>
        <h1 className='date'>{month} {year}</h1>
    </div>
);

export default DashboardDate;