import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login.jsx';
import useWithAuthentificate from './components/WithAuthenticate';
import Navigation from './components/Navigation';
import Home from './components/Home/Home';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';

import * as routes from './constants/routes';

const App = () => {
  useWithAuthentificate();
  
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
