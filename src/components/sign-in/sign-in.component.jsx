import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        //emailSignInStart
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value });
    };
    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span className='sub-title'>Sign in using your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput 
                    name = 'email'
                    type = 'email'
                    value = {email}
                    handleChange = {handleChange}
                    label = 'Email'
                    required
                />
                <FormInput 
                    name = 'password'
                    type = 'password'
                    value = {password}
                    handleChange = {handleChange}
                    label = 'Password'
                    required
                />

                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;