import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
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
        <Container className="content">
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h1>Login</h1>
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

                        <Button color="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(SignIn);
