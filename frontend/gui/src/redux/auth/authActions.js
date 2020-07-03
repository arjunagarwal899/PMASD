import * as actionTypes from './authTypes';
import {axiosLogin} from '../../apis/login';

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
	switch (String(recordError)) {
		case 'Request failed with status code 400':
			recordError = 'User credentials invalid. Please try again.';
			break;

		case 'Network Error':
			recordError = 'Backend server not functioning. Please restart system.';
			break;

		default:
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
		axiosLogin
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
