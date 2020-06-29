import * as actionTypes from './authTypes';
import login from '../../apis/login';

// Begin login action-type
export const authBegin = () => {
  return {
    type: actionTypes.AUTH_BEGIN,
  };
};

// Success login action-type
export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token,
  };
};

// Fail login action-type
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// Login action-type
export const authLogin = (username, password) => {
  // Async-await for sending post request to backend
  return async (dispatch) => {
    dispatch(authBegin());
    const res = await login
      .post('/auth/login/', {
        username: username,
        password: password,
      })
      .catch((err) => authFail(err));

    // Response from request
    const token = res.data.key;

    // Setting token to session storage
    sessionStorage.setItem('token', token);
    // Login success
    dispatch(authSuccess(token));
  };
};

// Logout action-type
export const logout = () => {
  sessionStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = sessionStorage.getItem('token');

    if (token === undefined) {
      dispatch(logout);
    } else {
      dispatch(authSuccess(token));
    }
  };
};
