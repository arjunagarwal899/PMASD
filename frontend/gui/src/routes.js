import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import history from './history';
import AuthContainer from './containers/AuthContainer';
import ChnagePassword from './components/ChangePassword';

const BaseRouter = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={AuthContainer} />
          <Route exact path="/changepassword" component={ChnagePassword} />
          {/*<Redirect from="/" to="/login/"/>*/}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default BaseRouter;
