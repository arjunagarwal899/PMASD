import * as actionTypes from './authTypes';
import {axiosLogin} from "../../apis/login";


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
	return {
		type: actionTypes.AUTH_FAIL,
		error: error.message,
	};
};


// Login action-type
const authLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authBegin());
		axiosLogin.post('/auth/login/', {
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
			.catch(
				(error) => dispatch(authFail(error))
			);
	};
};


// Logout action-type
const authLogout = () => {
	sessionStorage.removeItem('token');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};


const authCheckStatus = () => {
	return (dispatch) => {
		const token = sessionStorage.getItem('token');

		if (token === undefined) {
			dispatch(authLogout);
		} else {
			dispatch(authSuccess(token));
		}
	};
};


export {authLogin, authLogout, authCheckStatus};