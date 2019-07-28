import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

const NonAuthNav = (props) => {
    return (
        <div className="navbar" style={props.navbarStyles}>
            <div className="navbar__left">
                <Link style={{ ...props.linkStyles, margin: 0 }} to={routes.HOME}>Home</Link>
            </div>

            <div className="navbar__right" style={{ marginLeft: 'auto' }}>
                <Link style={props.linkStyles} to={routes.SIGN_UP}>Sign up</Link>
                <Link style={props.linkStyles} to={routes.LOGIN}>Login</Link>
            </div>
        </div>
    );
};

export default NonAuthNav;
