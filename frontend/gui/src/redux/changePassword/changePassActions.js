import * as actionTypes from './changePassTypes';
import {axiosWithoutHeaders} from '../../apis/login';
import history from '../../history';


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

	let recordError = error.message;

	switch (error.response) {
		case undefined:
			if (error.defaultError === null || error.defaultError) {
				recordError = 'Server not functioning. Please restart system.';
			}
			break;

		default:
			switch (error.response.status) {
				case 400:
					switch (String(errorType)) {
						case 'authentication_error':
							recordError = 'Old password was entered incorrectly. Please try again.';
							break;
						case 'password_restrictions':
							const errorsObject = error.response.data.new_password2;
							const errorsArray = Object.keys(errorsObject).map(key => errorsObject[key]);

							recordError = errorsArray.join(' ');

							break;
						default:
					}
					break;

				default:
			}
	}

	return {
		type: actionTypes.CHANGE_PASS_FAIL,
		error: recordError,
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
			.post('/auth/login/', {
				username: username,
				password: old_password,
			})
			.then((response) => {
				if (response.data.key) {
					axiosWithoutHeaders
						.post('/auth/password/change/', {
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
							history.push('/login/');
						})
						.catch((error) => {
							dispatch(changePasswordFail(error, 'password_restrictions'));
						});
				} else {
					dispatch(changePasswordFail({message: 'Unknown error', defaultError: false}));
				}
			})
			.catch((error) => {
				dispatch(changePasswordFail(error, 'authentication_error'));
			});
	};
};

export {changePassword, changePasswordReset};
