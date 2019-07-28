import { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import axios from 'axios';

import * as actions from '../../constants/actions_types';

const authenticate = async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!!token) {
        try {
            const requestBody = {
                query: `
                    query {
                        verifyToken(token: "${token}") {
                            _id
                            email
                        }
                    }
                `,
            };

            const { data } = await axios.post('/api', requestBody);
            const user = await data.data.verifyToken;

            if (user) {
                const { _id, email } = user;
                
                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email,
                    },
                });
            } else {
                dispatch({ type: actions.SET_AUTH_USER, authUser: null });
                localStorage.removeItem('token');
            }
        } catch {
            dispatch({ type: actions.SET_AUTH_USER, authUser: null });
        }
    } else {
        dispatch({ type: actions.SET_AUTH_USER, authUser: null });
    }
};

const useWithAuthenticate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        authenticate(dispatch);
    });
};

export default useWithAuthenticate;
