import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authLogout} from "../redux";

const MyComponent = (props) => {

	useEffect(() => {
		props.logout();
	}, []);

	return (
		<Redirect to="/"/>
	);
};


const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(authLogout())
	};
};

export default connect(null, mapDispatchToProps)(MyComponent);
