import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authLogout} from "../redux";

const MyComponent = (props) => {

	useEffect(() => {
		document.title = 'Logout | PMASD';

		props.logout();
	});

	return (
		<Redirect to={props.redirect ? props.redirect : "/"}/>
	);
};


const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(authLogout())
	};
};

export default connect(null, mapDispatchToProps)(MyComponent);
