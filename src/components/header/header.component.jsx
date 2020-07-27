import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/KeepingCents.svg';
import './header.styles.scss';

const Header = () => (
    <div className='header-container'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>
    </div>
);

export default Header;