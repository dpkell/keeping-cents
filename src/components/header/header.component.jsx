import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/KeepingCents.svg';

import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header-container'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>

        <div className='options-container'>
            {
                currentUser ? (
                    <Link as='div' to='/'>Sign Out</Link>
                ) : (
                    <Link to='/signin'>Sign In</Link>
                )
            }
        </div>
    </div>
);

export default Header;