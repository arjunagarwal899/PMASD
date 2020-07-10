import * as actionTypes from './authTypes';
import {axiosWithoutHeaders} from '../../apis/httpClient';
import history from '../../history';

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
	let recordError = error.message;

	switch (error.response) {
		case undefined:
			recordError = 'Server not functioning. Please restart system.';
			break;

		default:
			switch (error.response.status) {
				case 400:
					recordError = 'User credentials invalid. Please try again.';
					break;

				default:
			}
	}

	return {
		type: actionTypes.AUTH_FAIL,
		error: recordError,
	};
};

// Login action-type
const authLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authBegin());
		axiosWithoutHeaders
			.post('/auth/login/', {
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
				history.push('/');
			})
			.catch((error) => dispatch(authFail(error)));
	};
};

// Logout action-type
const authLogout = () => {
	sessionStorage.removeItem('token');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export {authLogin, authLogout};
