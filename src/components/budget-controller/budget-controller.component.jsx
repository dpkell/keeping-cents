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
    const [expenseId, setExpenseId] = usePersistedState('expId', {expId: 1});
    const [incomeId, setIncomeId] = usePersistedState('incId', {incId: 1});
    const [docObj, setDocObj] = useState({
        objType: '',
        objAmount: '',
        objDescription: '',
        objId: 0
    });

    useEffect(() => {
        
        console.log(docObj);

        return () => {
            _isMounted.current = false;
        }
    }, [incomeValue, expenseValue, docObj]);

    const { amount, description } = dataEntry;
    const { incId } = incomeId;
    const { expId } = expenseId;

    const handleSubmit =  event => {
        event.preventDefault();

        if (incomeValue === true && expenseValue === true) {
            alert('A data entry cannot be both an income and an expense.');
            return;
        }

        if (incomeValue === false && expenseValue === false) {
            alert('A data entry must either be classified as an income or expense.');
            return;
        }

        if (incomeValue) {
            incomeDataEntry();
        }

        if (expenseValue) {
            expenseDataEntry();
        }
    };


    const handleChange = event => {
        const { name, value } = event.target;

        setDataEntry({ ...dataEntry, [name]: value }); 
    };

    const incomeDataEntry = async () => {
        
        setIncomeId({incId: incId+1});
        console.log(incId);
        console.log(`${amount} ${description}`);
        setDocObj({
            objType: 'income',
            objAmount: amount,
            objDescription: description,
            objId: incId
        });

        try {
            await createDataEntryDocument(currentUser, year, month, docObj);
        } catch (error) {
            console.log('Error entering data: ', error.message);
        } finally {
            // setDocObj({
            //     objType: '',
            //     objAmount: '',
            //     objDescription: '',
            //     objId: 0
            // });
        }
    };

    const expenseDataEntry = () => {
        console.log('function called')
        setExpenseId({expId: expId+1});
        console.log(expId);
        console.log(`${amount} ${description}`);
        setDocObj({
            objType: 'expense',
            objAmount: amount,
            objDescription: description,
            objId: expId
        });
        
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
                        handleToggle={() => setExpenseValue(!expenseValue)}
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
                <button className='submit-button'>
                    <SubmitIcon className='submit-icon' type='submit'/>
                </button>
            </form>
        </div>
    );
}

export default BudgetController;