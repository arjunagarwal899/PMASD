import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import history from './history';
import UserContainer from "./containers/UserContainer";
import Logout from './components/Logout'


const BaseRouter = (props) => {
	return (
		<React.Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path="/login/" component={UserContainer}/>
					<Route exact path="/logout/" component={Logout}/>
					<Route exact path="/changepassword/" render={() => <UserContainer changePass={true} />} />

					{   props.isAuthenticated ?
							<Redirect from="/" to="/home/"/>
						:
							<Redirect from="/" to="/login/"/>
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
