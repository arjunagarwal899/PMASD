import * as actionTypes from './changePassTypes';
import * as urls from 'constants/urls';
import { axiosWithoutHeaders } from 'util/httpClient';
import history from '../../history';
import { parseAxiosError } from "util/requestManagement";


// Begin change password action type
const changePasswordBegin = () => {
	return {
		type: actionTypes.CHANGE_PASS_BEGIN,
	};
};

// Change Password success action type
const changePasswordSuccess = () => {
	return {
		type: actionTypes.CHANGE_PASS_SUCCESS,
	};
};

// Change password failed action type
const changePasswordFail = (error, errorType) => {
	let parsedError = parseAxiosError(error);
	
	switch (parsedError.status) {
		case 400:
			switch (String(errorType)) {
				case 'authentication_error':
					parsedError.message = 'Old password was entered incorrectly. Please try again.';
					break;
				case 'password_restrictions':
					const errorsObject = error.response.data.new_password2;
					const errorsArray = Object.keys(errorsObject).map(key => errorsObject[key]);
					
					parsedError.message = errorsArray.join(' ');
					
					break;
				default:
			}
			break;
		
		default:
	}
	
	
	return {
		type: actionTypes.CHANGE_PASS_FAIL,
		error: parsedError.message,
	};
};

// Change Password reset type
const changePasswordReset = () => {
	return {
		type: actionTypes.CHANGE_PASS_RESET,
	}
};


// Change Password action type
const changePassword = (username = 'admin', old_password, new_password1, new_password2) => {
	return (dispatch) => {
		dispatch(changePasswordBegin());
		
		axiosWithoutHeaders
			.post('auth/login/', {
				username: username,
				password: old_password,
			})
			.then((response) => {
				if (response.data.key) {
					axiosWithoutHeaders
						.post('auth/password/change/', {
							old_password: old_password,
							new_password1: new_password1,
							new_password2: new_password2,
						}, {
							headers: {
								"Content-Type": "application/json",
								Authorization: "Token " + response.data.key
							}
						})
						.then((response) => {
							// Password change success
							dispatch(changePasswordSuccess());
							
							// Doing programmatic navigation after getting a correct response to redirect back to the login page
							history.push(urls.login);
						})
						.catch((error) => {
							dispatch(changePasswordFail(error, 'password_restrictions'));
						});
				} else {
					dispatch(changePasswordFail({ message: 'Unknown error', defaultError: false }));
				}
			})
			.catch((error) => {
				dispatch(changePasswordFail(error, 'authentication_error'));
			});
	};
};

export { changePassword, changePasswordReset };
