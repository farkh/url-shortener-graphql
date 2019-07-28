import React, { useCallback, useState, Fragment } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import * as routes from '../../constants/routes';
import * as actions from '../../constants/actions_types';

const Navigation = () => {
    const dispatch = useDispatch();
    const [isOpen, setMenuState] = useState(false);
    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser,
    }), []);

    const { authUser } = useMappedState(mapState);

    const logout = (e) => {
        if (e) e.preventDefault();
        
        dispatch({
            type: actions.SET_AUTH_USER,
            authUser: null,
        });
        localStorage.removeItem('token');
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href={routes.HOME}>URLShortener</NavbarBrand>
            <NavbarToggler onClick={setMenuState} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href={routes.HOME}>Home</NavLink>
                    </NavItem>
                    {!authUser && (
                        <Fragment>
                            <NavItem>
                                <NavLink href={routes.LOGIN}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={routes.SIGN_UP}>Sign up</NavLink>
                            </NavItem>
                        </Fragment>
                    )}
                    {authUser && (
                        <Fragment>
                            <NavItem>
                                <NavLink href={routes.URL_LIST}>My URLs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href={routes.HOME}
                                    onClick={logout}
                                >
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Fragment>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Navigation;
