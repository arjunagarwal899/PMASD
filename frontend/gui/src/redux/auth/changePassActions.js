import * as actionTypes from './authTypes';
import { axiosLogin } from '../../apis/login';
import history from '../../history';

// Begin change password action type
const changePasswordBegin = () => {
  return {
    type: actionTypes.PASS_BEGIN,
  };
};

// Change Password success action type
const changePasswordSuccess = () => {
  return {
    type: actionTypes.PASS_SUCCESS,
  };
};

// Change password failed action type
const changePasswordFail = (error) => {
  return {
    type: actionTypes.PASS_FAIL,
    error: error.message,
  };
};

// Change Password action type
const changePassword = (old_password, new_password1, new_password2) => {
  return (dispatch) => {
    dispatch(changePasswordBegin());
    axiosLogin
      .post('/auth/password/change', {
        old_password,
        new_password1,
        new_password2,
      })
      .then((res) => {
        console.log(res);
        // Password change success
        dispatch(changePasswordSuccess());
        // Doing programmatic navigation after getting a correct response to redirect back to the login page
        history.push('/login');
      })
      .catch((err) => {
        dispatch(changePasswordFail(err));
      });
  };
};

export { changePassword };
