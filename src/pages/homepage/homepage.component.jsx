import React, {
    useContext,
    useState,
    useEffect
} from 'react';

import { DateContext } from '../../DateContext';

import BudgetDashboard from '../../components/budget-dashboard/budget-dashboard.component';
import EntryTableOverview from '../../components/entry-table-overview/entry-table-overview.component';
import PreviousMonthsDisplay from '../../components/previous-month-table-display/previous-month-table-display.component';
import './homepage.styles.scss';

const HomePage = () => {
    const { month, year } = useContext(DateContext);
    console.log(`${month} ${year}`)
    return (
        <div className="homepage">
                <BudgetDashboard />
                <EntryTableOverview />
                <PreviousMonthsDisplay />
        </div>
    )
};

export default HomePage;