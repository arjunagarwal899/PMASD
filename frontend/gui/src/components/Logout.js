import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authLogout } from "myredux";
import * as urls from 'constants/urls';

const Logout = (props) => {
	
	useEffect(() => {
		document.title = 'Logout | PMASD';
		
		props.logout();
	}, []);             // eslint-disable-line
	
	return (
		<Redirect to={props.redirect ? props.redirect : urls.login} />
	);
};


const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(authLogout())
	};
};

export default connect(null, mapDispatchToProps)(Logout);
