import * as actionTypes from '../auth/authTypes';


// Initial state of the application for login
const initialState = {
	token: null,
	error: null,
	loading: false,
	isAuthenticated: (sessionStorage.getItem('token') !== null),
};


// reducer for auth-begin
const authBegin = (state, action) => {
	return {
		...state,
		error: null,
		loading: true
	};
};


// reducer for auth-success
const authSuccess = (state, action) => {
	return {
		...state,
		token: action.token,
		error: null,
		loading: false,
		isAuthenticated: true,
	};
};


// reducer for auth-fail
const authFail = (state, action) => {
	return {
		...state,
		error: action.error,
		loading: false,
		isAuthenticated: false,
	};
};


// reducer form auth-logout
const authLogout = (state, action) => {
	return {
		...state,
		token: null,
		isAuthenticated: false,
	};
};


const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_BEGIN:
			return authBegin(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};


export default authReducer;
