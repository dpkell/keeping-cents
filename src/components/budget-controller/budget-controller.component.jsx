import React, { useState } from 'react';

import { ReactComponent as SubmitIcon } from '../../assets/check.svg';

import './budget-controller.styles.scss';

const BudgetController = () => {
    const [dataEntry, setDataEntry] = useState({ type: '', amount: '', description: '' });

    const { type, amount, description } = dataEntry;

    const handleSubmit = async event => {
        event.preventDefault();

        //emailSignInStart
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setDataEntry({ ...dataEntry, [name]: value });

        console.log(dataEntry);
    }
    
    return (
        <div className='budget-controller-container'>
            <form className='controller-form' noValidate>
                <select value={type} onChange={handleChange}>
                    <option 
                        name='type'
                        value= 'income'
                    >
                        &#43;
                    </option>
                    <option
                        name='type' 
                        value= 'expense'
                    >
                        &minus;
                    </option>
                </select>
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
                <div className='submit-button'>
                    <SubmitIcon className='submit-icon' type='submit'/>
                </div>
            </form>
        </div>
    );
}

export default BudgetController;