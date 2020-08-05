import React, { useState } from 'react';


import { ReactComponent as SubmitIcon } from '../../assets/check.svg';
import ToggleSwitch from '../toggle-switch/toggle-switch.component';

import './budget-controller.styles.scss';

const BudgetController = () => {
    const [dataEntry, setDataEntry] = useState({amount: '', description: '' });

    const { amount, description } = dataEntry;

    const [typeEntry, setTypeEntry] = useState({ type: '' })


    const [incomeValue, setIncomeValue] = useState(false);

    const [expenseValue, setExpenseValue] = useState(false);

    const [value, setValue] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault();

        //enterValuesToFirestore
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
            <form className='controller-form' noValidate>
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