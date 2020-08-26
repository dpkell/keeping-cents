import React, { useState, useContext, useEffect, useRef } from 'react';

import { AuthContext } from '../../AuthContext';

import usePersistedState from '../../usePersistedState';
import { ReactComponent as SubmitIcon } from '../../assets/check.svg';
import ToggleSwitch from '../toggle-switch/toggle-switch.component';

import { createDataEntryDocument } from '../../firebase/firebase.utils';

import './budget-controller.styles.scss';

const BudgetController = ({ month, year, ...otherProps }) => {
    const { currentUser } = useContext(AuthContext);
    const _isMounted = useRef(true);

    const [dataEntry, setDataEntry] = useState({amount: '', description: '' });
    const [typeEntry, setTypeEntry] = useState({ type: '' })
    const [incomeValue, setIncomeValue] = useState(false);
    const [expenseValue, setExpenseValue] = useState(false);
    const [value, setValue] = useState(false)
    const [expenseId, setExpenseId] = usePersistedState('expenseId', 0);
    const [incomeId, setIncomeId] = usePersistedState('incomeId', 0);
    const [dataSubmission, setDataSubmission] = useState({
        type: '',
        amount: '',
        description: '',
        dataId: 0
    });

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    })

    const { amount, description } = dataEntry;

    const setEntryType = () => {
        if (incomeValue) {
            setTypeEntry({ type: 'income' });
        }

        if (expenseValue) {
            setTypeEntry({ type: 'expense' });
        }

        return typeEntry;
    }

    const handleSubmit = async event => {
        event.preventDefault();

        if (incomeValue === true && expenseValue === true) {
            alert('A data entry cannot be both an income and an expense.');
            return;
        }

        if (incomeValue === false && expenseValue === false) {
            alert('A data entry must either be classified as an income or expense.');
            return;
        }

        setTypeEntry();

        const { type } = typeEntry; 

        if ( type === 'income') {
            setIncomeId({incomeId: incomeId+1});
            setDataSubmission({
                type: type,
                amount: amount,
                description: description,
                dataId: incomeId
            });
        }

        if ( type === 'expense') {
            setExpenseId({expenseId: expenseId+1});
            setDataSubmission({
                type: type,
                amount: amount,
                description: description,
                dataId: expenseId
            });
        }

        try {
            await createDataEntryDocument(currentUser, year, month, dataSubmission);
        } catch (error) {
            console.log('Error submitting data into database: ', error.message);
        } finally {
            setDataSubmission({
                type: '',
                amount: '',
                description: '',
                dataId: 0
            });
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setDataEntry({ ...dataEntry, [name]: value });

        console.log(dataEntry);
    };

    const handleTypeChange = event => {
        const { name, value } = event.target;
        
        setTypeEntry({type: value});

        console.log(typeEntry);
    };
    
    return (
        <div className='budget-controller-container'>
            <form className='controller-form' onSubmit={handleSubmit} noValidate>
                <div className='type-checkbox-container'>
                    <ToggleSwitch
                        toggleLabel='&#43;'
                        toggleId='incomeToggle'
                        isOn={incomeValue}
                        onColor="#48ffc9"
                        handleToggle={() => setIncomeValue(!incomeValue)}
                    />
                    <ToggleSwitch 
                        toggleLabel='&minus;'
                        toggleId='expenseToggle'
                        isOn={expenseValue}
                        onColor="#fe2d47"
                        handleToggle={()=> setExpenseValue(!expenseValue)}
                    />
                </div>
                <input className='amount-entry'
                    type = 'number'
                    name = 'amount'
                    value = {amount}
                    onChange={handleChange}
                    placeholder = ' Amount'
                    required
                />

                <input className='description-entry'
                    type = 'text'
                    name = 'description'
                    value = {description}
                    onChange={handleChange}
                    placeholder = ' Description'
                    required
                />
                <a className='submit-button'>
                    <SubmitIcon className='submit-icon' type='submit'/>
                </a>
            </form>
        </div>
    );
}

export default BudgetController;