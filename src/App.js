import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import { DateProvider } from './DateContext';
import LoginRedirectRoute from './components/user-sign-in-redirect/user-sign-in-redirect.component';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';




import './App.scss';


function App () {

  return (
    <AuthProvider>
      <DateProvider>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <LoginRedirectRoute
            exact
            path='/signin'
          />
        </Switch>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;
