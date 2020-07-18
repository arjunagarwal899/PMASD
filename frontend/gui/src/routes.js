import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import * as urls from 'constants/urls';
import history from './history';
import AuthContainer from "./containers/AuthContainer";
import Logout from './components/Logout';
import HomeContainer from './containers/HomeContainer';
import PatientContainer from "containers/PatientContainer/PatientContainer";
import Consultation from "containers/Consultation";

const BaseRouter = props => {
	return (
		<React.Fragment>
			<Router history={history}>
				<Switch>
					{!props.isAuthenticated ?
						<>
							<Route exact path={urls.login} component={AuthContainer} />
							<Route exact path={urls.changePassword}
							       render={() => <AuthContainer changePass={true} />} />
							
							{/*Redirects*/}
							<Redirect to={urls.login} />
						</>
						:
						<>
							{/*Authentication routes*/}
							<Route exact path={urls.logout} component={Logout} />
							
							<Route exact path={urls.consultation} component={Consultation} />
							<Route exact path="/patient/" component={PatientContainer} />
							
							{/* Home route */}
							<Route exact path={urls.home} component={HomeContainer} />
							
							{/*Redirects*/}
							<Route exact path="/"> <Redirect to={urls.home} /> </Route>
						</>
					}
				</Switch>
			</Router>
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(BaseRouter);
