import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';

import * as routes from '../../constants/routes';

import AuthNav from './auth';
import NonAuthNav from './nonauth';

const navbarStyles = {
    display: 'flex',
    background: '#1e1e1e',
    padding: '20px 60px',
};

const linkStyles = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: 20,
};

const Navigation = () => {
    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser,
    }), []);

    const { authUser } = useMappedState(mapState);
    
    return authUser ? 
        <AuthNav navbarStyles={navbarStyles} linkStyles={linkStyles} /> : 
        <NonAuthNav navbarStyles={navbarStyles} linkStyles={linkStyles} />;
};

export default Navigation;
