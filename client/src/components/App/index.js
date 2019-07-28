import React, { useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';

import useWithAuthenticate from '../WithAuthenticate';
import Navigation from '../Navigation';
import Home from '../Home';
import NotFound from '../NotFound';
import SignUp from '../SignUp';
import Login from '../Login';

import * as routes from '../../constants/routes';
import './App.css';

const App = () => {
  useWithAuthenticate();
  const mapState = useCallback((state) => ({
    loading: state.sessionState.loading,
  }), []);

  const { loading } = useMappedState(mapState);

  if (loading) return <h1>Loading...</h1>

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path={routes.HOME} component={() => <Home />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
          <Route exact path={routes.LOGIN} component={() => <Login />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
