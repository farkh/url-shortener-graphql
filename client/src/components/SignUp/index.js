import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';

import * as actions from '../../constants/actions_types';
import * as routes from '../../constants/routes';

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const _handleChange = setter => e => {
        setter(e.target.value);
    };

    const _handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        const requestbody = {
            query: `
                mutation {
                    createUser(userInput: {
                        email: "${email}"
                        password: "${password}"
                        confirm: "${confirm}"
                    }) {
                        _id
                        token
                        email
                    }
                }
            `,
        };

        try {
            const { data } = await axios.post('/api', requestbody);

            if (data.errors) {
                setError(data.errors[0].message);
                setLoading(false);
            } else {
                const { _id, token } = await data.data.createUser;

                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email,
                    },
                });
                setError(null);
                setLoading(false);
                localStorage.setItem('token', token);
                props.history.push(routes.HOME);
            }
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };
    
    return (
        <div className="content">
            <h1>Sign Up</h1>

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

                <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={_handleChange(setConfirm)}
                />

                <div><span style={{ color: "red" }}>{error || ""}</span></div>

                <input type="submit" value={loading ? 'Verifying...' : 'Sign Up'} />
            </form>
        </div>
    );
};

export default withRouter(SignUp);
