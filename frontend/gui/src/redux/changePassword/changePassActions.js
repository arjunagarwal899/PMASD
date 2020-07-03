import * as actionTypes from './changePassTypes';
import {axiosLogin} from '../../apis/login';
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
	switch (String(recordError)) {
		case 'Request failed with status code 400':
			switch (String(errorType)) {
				case 'authentication_error':
					recordError = 'Old password was entered incorrectly. Please try again.';
					break;
				case '':
					recordError = '';
					break;
				default:
			}
			break;

		case 'Network Error':
			recordError = 'Backend server not functioning. Please restart system.';
			break;

		default:
	}

	return {
		type: actionTypes.CHANGE_PASS_FAIL,
		error: recordError,
	};
};


// Change Password action type
const changePassword = (username = 'admin', old_password, new_password1, new_password2) => {
	return (dispatch) => {
		dispatch(changePasswordBegin());

		axiosLogin
			.post('/auth/login/', {
				username: username,
				password: old_password,
			})
			.then((response) => {
				if (response.data.key) {
					axiosLogin
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
							console.log(response);

							// Password change success
							dispatch(changePasswordSuccess());

							// Doing programmatic navigation after getting a correct response to redirect back to the login page
							history.push('/login/');
						})
						.catch((error) => {
							console.log(error.message)
							dispatch(changePasswordFail(error));
						});
				} else {
					dispatch(changePasswordFail({message: 'Unknown error'}));
				}
			})
			.catch((error) => {
				dispatch(changePasswordFail(error, 'authentication_error'));
			});
	};
};

export {changePassword};
