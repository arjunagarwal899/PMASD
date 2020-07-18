import * as actionTypes from './authTypes';
import * as urls from 'constants/urls';
import { axiosWithHeaders, axiosWithoutHeaders } from 'util/httpClient';
import history from '../../history';
import { parseAxiosError } from "util/requestManagement";

// Begin login action-type
const authBegin = () => {
	return {
		type: actionTypes.AUTH_BEGIN,
	};
};

// Success login action-type
const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
	};
};

// Fail login action-type
const authFail = (error) => {
	let parsedError = parseAxiosError(error);
	
	switch (error.status) {
		case 400:
			parsedError.message = 'User credentials invalid. Please try again.';
			break;
		
		default:
	}
	
	return {
		type: actionTypes.AUTH_FAIL,
		error: parsedError.message,
	};
};

// Login action-type
const authLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authBegin());
		axiosWithoutHeaders
			.post('auth/login/', {
				username: username,
				password: password,
			})
			.then((response) => {
				const token = response.data.key;
				
				// Setting token to session storage
				sessionStorage.setItem('token', token);
				// Login success
				dispatch(authSuccess(token));
				// Do programmatic navigation to home page
				history.push(urls.home);
			})
			.catch((error) => dispatch(authFail(error)));
	};
};

// Logout action-type
const authLogout = () => {
	axiosWithHeaders.delete('auth/delete_token/');
	sessionStorage.removeItem('token');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export { authLogin, authLogout };
