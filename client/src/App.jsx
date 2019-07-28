import React, { useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';

import useWithAuthentificate from './components/WithAuthenticate';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Loader from './components/Loader/Loader';

import * as routes from './constants/routes';

const App = () => {
  useWithAuthentificate();

  const mapState = useCallback((state) => ({
    loading: state.sessionState.loading,
  }), []);

  const { loading } = useMappedState(mapState);

  if (loading) return <Loader />;
  
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
