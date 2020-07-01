import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';

import history from './history';
import AuthContainer from "./containers/AuthContainer";
import Logout from './components/Logout'


const BaseRouter = (props) => {
	return (
		<React.Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path="/login" component={AuthContainer}/>
					<Route exact path="/logout" component={Logout}/>

					{   props.isAuthenticated ?
							<Redirect from="/" to="/home"/>
						:
							<Redirect from="/" to="/login"/>
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
