import React from 'react';
import { Route, Redirect, Switch, Router } from 'react-router-dom';

import history from './history';
import Login from './components/Login.js';

const BaseRouter = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default BaseRouter;
