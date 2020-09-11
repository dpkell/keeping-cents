import React, {
    useState,
    useEffect,
    useContext,
    createContext
} from 'react';

import { AuthContext } from './AuthContext';
import { DateContext } from './DateContext';

import { fetchDataEntries, firestore } from './firebase/firebase.utils';

export const EntryDataContext = createContext();

export const EntryDataProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext);
    const { month, year } = useContext(DateContext);

    const [incomeEntries, setIncomeEntries] = useState([]);
    const [expenseEntries, setExpenseEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const sortItemsList = (itemsArray) => {
        itemsArray.sort(function(a,b){return a.id-b.id});
    };


    useEffect( () => {
        const fetchData = async () => {
            const incomeEntriesRef = await fetchDataEntries(currentUser, year, month, 'income');
            if(!incomeEntriesRef) return;
            incomeEntriesRef.onSnapshot(incomeSnapShot => {
                const incomeEntriesArray = [];
                incomeSnapShot.docs.map(income => {
                    console.log(income);
                    incomeEntriesArray.push(income.data());
                })
                console.log(incomeEntriesArray);
                sortItemsList(incomeEntriesArray);
                setIncomeEntries(incomeEntriesArray); 
                console.log(incomeEntries);
            });

            const expenseEntriesRef = await fetchDataEntries(currentUser, year, month, 'expense');
            if(!expenseEntriesRef) return;
            expenseEntriesRef.onSnapshot(expenseSnapShot => {
                const expenseEntriesArray = [];
                expenseSnapShot.docs.map(expense => {
                    expenseEntriesArray.push(expense.data());
                })
                sortItemsList(expenseEntriesArray);
                setExpenseEntries(expenseEntriesArray);
                console.log(expenseEntries);
            });
            setIsLoading(false);
        };

        fetchData();
        

        return () => {
            fetchData();
        }
    }, [currentUser, month]);

    if(isLoading) {
        return <>Loading...</>
    };

    return (
        <EntryDataContext.Provider
            value={incomeEntries, expenseEntries}
        >
            {children}
        </EntryDataContext.Provider>
    );

};