import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import * as urls from 'constants/urls';
import history from './history';
import AuthContainer from "./containers/AuthContainer";
import Logout from './components/Logout';
import HomeContainer from './containers/HomeContainer';
import PatientContainer from "containers/PatientBasicContainer/ExistingPatientContainer";
import ConsultationContainer from "containers/ConsultationContainer";
import ExaminationContainer from "containers/ExaminationContainer";

const BaseRouter = props => {
	return (
		<React.Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path={urls.login} component={AuthContainer} />
					<Route exact path={urls.changePassword}
					       render={() => <AuthContainer changePass={true} />} />
					
					{/* Examination route, separate couse I wanted to check only the rendering part */}
					<Route exact path={urls.examination} component={ExaminationContainer} />
					{!props.isAuthenticated ?
						<Redirect to={urls.login} />
						:
						<>
							{/*Authentication routes*/}
							<Route exact path={urls.logout} component={Logout} />
							
							<Route exact path={urls.consultation} component={ConsultationContainer} />
							<Route exact path="/patient/" component={PatientContainer} />
							
							{/* Home route */}
							<Route exact path={urls.home} component={HomeContainer} />
							
							{/*Redirects*/}
							<Route exact path="/"><Redirect to={urls.home} /></Route>
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
