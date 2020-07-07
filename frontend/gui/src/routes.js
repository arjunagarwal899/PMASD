import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import history from './history';
import AuthContainer from "./containers/AuthContainer";
import Logout from './components/Logout'
import Patient from './components/Patient';
import HomeContainer from './containers/HomeContainer';

const BaseRouter = (props) => {
	return (
		<React.Fragment>
			<Router history={history}>
				<Switch>
					{/*Authentication routes*/}
					<Route exact path="/login/" component={AuthContainer}/>
					<Route exact path="/logout/" component={Logout}/>
					<Route exact path="/changepassword/" render={() => <AuthContainer changePass={true}/>}/>

					{/*Data management routes*/}
					<Route exact path="/patient/" component={Patient}/>

					{/* Home route */}
					<Route exact path="/home/" component={HomeContainer}/>

					{/*Redirects*/}
					{ !props.isAuthenticated ?
						<Redirect to="/login/"/>
						:
						<Redirect from="/" to="/home/"/>
					}
				</Switch>
			</Router>
		</React.Fragment>
	);
};


const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(BaseRouter);
