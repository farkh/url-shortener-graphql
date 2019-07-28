import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';

import * as actions from '../../constants/actions_types';
import * as routes from '../../constants/routes';

const SignIn = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const _handleChange = setter => e => {
        setter(e.target.value);
    };

    const _handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        try {
            const requestBody = {
                query: `
                    query {
                        login(email: "${email}", password: "${password}") {
                            _id
                            token
                            email
                        }
                    }
                `,
            };

            const { data } = await axios.post('/api', requestBody);

            if (data.errors) {
                setLoading(false);
                setError(data.errors[0].message);
            } else {
                const { _id, token } = data.data.login;

                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email,
                    },
                });
                setLoading(false);
                setError(null);
                localStorage.setItem('token', token);
                props.history.push(routes.HOME);
            }
        } catch(err) {
            setError(err);
            setLoading(false);
        }
    };
    
    return (
        <div className="content">
            <h1>Login</h1>

            <form className="form" onSubmit={_handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={_handleChange(setEmail)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={_handleChange(setPassword)}
                />

                <div><span style={{ color: "red" }}>{error || ""}</span></div>

                <input type="submit" value={loading ? 'Verifying...' : 'Login'} />
            </form>
        </div>
    );
};

export default withRouter(SignIn);
