import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';
import {DateContext} from '../../DateContext';

import {auth} from '../../firebase/firebase.utils';

import YtdBudgetDisplay from '../ytd-budget-display/ytd-budget-display.component';
import { ReactComponent as Logo } from '../../assets/KeepingCents.svg';

import './header.styles.scss';

const Header = () =>{ 
const { currentUser } = useContext(AuthContext);
const {year} = useContext(DateContext);
return (
    <div className='header-container'>
        <div className='logo-title-container'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>

        <h1 className='header-title'>KeepingCents</h1>
        </div>


        <div className='ytd-container'>
            <YtdBudgetDisplay year={year} />
        </div>

        <div className='options-container'>
            {
                currentUser ? (
                    <Link as='div' to='/' onClick={() => auth.signOut()}>Sign Out</Link>
                ) : (
                    <Link to='/signin'>Sign In</Link>
                )
            }
        </div>
    </div>
);

};

export default Header;