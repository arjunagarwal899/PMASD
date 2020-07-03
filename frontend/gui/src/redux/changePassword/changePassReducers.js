import * as actionTypes from './changePassTypes';

// Initial state of application for change password
const initialState = {
	error: null,
	success: false,
	loading: false,
};

// reducer for password change begin
const changePasswordBegin = (state, action) => {
	return {
		...state,
		error: null,
		success: false,
		loading: true,
	};
};

// reducer for password change success
const changePasswordSuccess = (state, action) => {
	return {
		...state,
		error: null,
		success: true,
		loading: false,
	}
}

// reducer for password change fail
const changePasswordFail = (state, action) => {
	return {
		...state,
		error: action.error,
		success: false,
		loading: false,
	}
}

const changePasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_PASS_BEGIN:
			return changePasswordBegin(state, action);
		case actionTypes.CHANGE_PASS_SUCCESS:
			return changePasswordSuccess(state, action);
		case actionTypes.CHANGE_PASS_FAIL:
			return changePasswordFail(state, action);
		default:
			return state;
	}
}

export default changePasswordReducer;