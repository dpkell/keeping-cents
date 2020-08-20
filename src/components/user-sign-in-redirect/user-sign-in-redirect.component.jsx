import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import SignInandSignUpPage from '../../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const LoginRedirectRoute = ({component={SignInandSignUpPage}, ...otherProps }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route 
            {...otherProps}
            render = {routeProps =>
                !currentUser ? (
                    <SignInandSignUpPage {...routeProps} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    );
};

export default LoginRedirectRoute;