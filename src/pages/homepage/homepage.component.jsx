import React from 'react';

import CurrentBudgetDashboard from '../../components/current-budget-dashboard/current-budget-dashboard.component';
import YtdBudgetDisplay from '../../components/ytd-budget-display/ytd-budget-display.component';
import EntryTableOverview from '../../components/entry-table-overview/entry-table-overview.component';
import PreviousMonthsDisplay from '../../components/previous-month-table-display/previous-month-table-display.component';
import './homepage.styles.scss';

const HomePage = () => (
    <div className="homepage">
            <CurrentBudgetDashboard />
            <EntryTableOverview />
            <PreviousMonthsDisplay />
    </div>
);

export default HomePage;