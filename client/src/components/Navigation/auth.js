import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';

import * as routes from '../../constants/routes';
import * as actions from '../../constants/actions_types';

const AuthNav = (props) => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({
            type: actions.SET_AUTH_USER,
            authUser: null,
        });
        localStorage.removeItem('token');
    };
    
    return (
        <div className="navbar" style={props.navbarStyles}>
            <div className="navbar__left">
                <Link style={{ ...props.linkStyles, margin: 0 }} to={routes.HOME}>Home</Link>
            </div>

            <div className="navbar__right" style={{ marginLeft: 'auto' }}>
                <Link style={props.linkStyles} onClick={logout} to={routes.HOME}>Logout</Link>
            </div>
        </div>
    );
};

export default AuthNav;
