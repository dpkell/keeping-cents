import React from 'react';

import BudgetController from '../budget-controller/budget-controller.component';
import DisplayTotal from '../dashboard-total-display/dashboard-total-display.component';
import DisplayExpense from '../dashboard-expense-display/dashboard-expense-display.component';
import DisplayIncome from '../dashboard-income-display/dashboard-income-display.component';
import DashboardDate from '../dashboard-date/dashboard-date.component';

import './budget-dashboard.styles.scss';

const BudgetDashboard = () => (
    <div className='dashboard-container'>
        <div className='date-container'>
            <DashboardDate />
        </div>
        <div className='displays-container'>
            <DisplayIncome />
            <DisplayTotal />
            <DisplayExpense />
        </div>

        <div className='controller-container'>
            <BudgetController />
        </div>
    </div>
);

export default BudgetDashboard;