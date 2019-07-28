import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button,
} from 'reactstrap';

import Loader from '../Loader/Loader';

import * as actions from '../../constants/actions_types';
import * as routes from '../../constants/routes';

const SignUp = (props) => {
    const dispatch = useDispatch();

    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser,
    }), []);

    const { authUser } = useMappedState(mapState);

    if (authUser) props.history.push(routes.HOME);
    
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
    
    if (loading) return <Loader />;
    
    return (
        <Container className="content">
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h1>Sign Up</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={_handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="something@example.com"
                                value={email}
                                onChange={_handleChange(setEmail)}
                            />
                            <FormFeedback>Email not found</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••"
                                value={password}
                                onChange={_handleChange(setPassword)}
                            />
                            <FormFeedback>Password incorrect</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="confirm"
                                id="confirm"
                                placeholder="••••••"
                                value={confirm}
                                onChange={_handleChange(setConfirm)}
                            />
                            <FormFeedback>Passwords must match</FormFeedback>
                        </FormGroup>

                        {error && <p>{error}</p>}

                        <Button color="primary">Sign Up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(SignUp);
