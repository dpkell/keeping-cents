import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


import './App.scss';

function App({checkUserSession, currentUser }) {


  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route 
          exact
          path='/signin'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInandSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
