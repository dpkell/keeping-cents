import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // SignUpStart here
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span className='sub-title'>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type = 'text'
                    name = 'displayName'
                    value = {displayName}
                    handleChange = {handleChange}
                    label = 'Display Name'
                    required
                />
                <FormInput 
                    type = 'email'
                    name = 'email'
                    value = {email}
                    handleChange = {handleChange}
                    label = 'Email'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'password'
                    value = {password}
                    handleChange = {handleChange}
                    label = 'Password'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'confirmPassword'
                    value = {confirmPassword}
                    handleChange = {handleChange}
                    label = 'Confirm Password'
                    required
                />
                <div className='form-button'>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignUp;