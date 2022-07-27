import { sendEmailToRestorePassword, updatePassword, registerNewUser, getUserInfo, updateUserInfo, login, logout, refreshToken as refreshTokenServer } from '../../api/api-requests';
import { setCookie, deleteCookie, getCookie } from '../cookie-setting';

export const REGISTR_USER_REQUEST = 'REGISTR_USER_REQUEST';
export const REGISTR_USER_SUCCESS = 'REGISTR_USER_SUCCESS';
export const REGISTR_USER_FAILED = 'REGISTR_USER_FAILED';
export const CLEAR_REGISTER_ERR = 'CLEAR_REGISTER_ERR';

export const PWD_RECOVER_INITIAL = 'PWD_RECOVER_INITIAL';
export const PWD_RECOVER_REQUEST = 'PWD_RECOVER_REQUEST';
export const PWD_RECOVER_FAILED = 'PWD_RECOVER_FAILED';
export const PWD_RECOVER_SUCCESS = 'PWD_RECOVER_SUCCESS';
export const CLEAR_PWD_RECOVER_ERR = 'CLEAR_PWD_RECOVER_ERR';

export const PWD_RESET_INITIAL = 'PWD_RESET_INITIAL';
export const PWD_RESET_REQUEST = 'PWD_RESET_REQUEST';
export const PWD_RESET_SUCCESS = 'PWD_RESET_SUCCESS';
export const PWD_RESET_FAILED = 'PWD_RESET_FAILED';
export const CLEAR_PWD_RESET_ERR = 'CLEAR_PWD_RESET_ERR';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';
export const CLEAR_LOG_IN_ERR = 'CLEAR_LOG_IN_ERR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED = 'LOG_OUT_FAILED';
export const CLEAR_LOG_OUT_ERR = 'CLEAR_LOG_OUT_ERR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const CLEAR_GET_USER_ERR = 'CLEAR_GET_USER_ERR';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';
export const CLEAR_PATCH_USER_ERR = 'CLEAR_PATCH_USER_ERR';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const CLEAR_REFRESH_TOKEN_ERR = 'CLEAR_REFRESH_TOKEN_ERR';

export const CHECK_AUTH = 'CHECK_AUTH';
export const CHECK_AUTH_CHECKED = 'CHECK_AUTH_CHECKED';

export const resetPasswordRecoverPageToInitial = () => {
  return function (dispatch) {
    dispatch({ type: PWD_RECOVER_INITIAL });
  };
};

export const resetPasswordResetPageToInitial = () => {
  return function (dispatch) {
    dispatch({ type: PWD_RESET_INITIAL });
  };
};

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch({ type: LOG_IN_REQUEST });
    login(email, password)
      .then((res) => {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: LOG_IN_SUCCESS, user: res.user });
      })
      .catch((err) => {
        dispatch({ type: LOG_IN_FAILED, err: err.message });
      });
  };
};

export const logoutUser = () => {
  return function (dispatch) {

    dispatch({ type: LOG_OUT_REQUEST });
    logout()
      .then((res) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({ type: LOG_OUT_SUCCESS });
      })
      .catch((err) => dispatch({ type: LOG_OUT_FAILED, err: err.message }));
  };
};

export const createNewUser = (email, password, name) => {
  return function (dispatch) {
    dispatch({ type: REGISTR_USER_REQUEST });

    registerNewUser(email, password, name)
      .then((res) => {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: REGISTR_USER_SUCCESS, user: res.user });
      })
      .catch((err) => {
        dispatch({ type: REGISTR_USER_FAILED, err: err.message });
      });
  };
};

export const getUser = () => {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    getUserInfo()
      .then((res) => dispatch({ type: GET_USER_SUCCESS, user: res.user }))
      .catch((err) => {
        dispatch({ type: GET_USER_FAILED, err: err.message });
      });
  };
};


export const patchUser = ({ name, email, password }) => {
  return function (dispatch) {
    dispatch({ type: PATCH_USER_REQUEST });
    updateUserInfo(name, email, password)
      .then((res) => dispatch({ type: PATCH_USER_SUCCESS, user: res.user }))
      .catch((err) => {
        dispatch({ type: PATCH_USER_FAILED, err: err.message });
      });
  };
};



export const resetPassword = (password, token) => {
  return function (dispatch) {
    dispatch({ type: PWD_RESET_REQUEST });
    updatePassword(password, token)
      .then((res) => dispatch({ type: PWD_RESET_SUCCESS, success: res.success }))
      .catch((err) => dispatch({ type: PWD_RESET_FAILED, err: err.message }));
  };
};

export const sendRecoverPasswordEmail = (email) => {
  return function (dispatch) {
    dispatch({ type: PWD_RECOVER_REQUEST });
    sendEmailToRestorePassword(email)
      .then((res) => dispatch({ type: PWD_RECOVER_SUCCESS, success: res.success }))
      .catch((err) => dispatch({ type: PWD_RECOVER_FAILED, err: err.message }));
  };
};

export const checkAuth = () => {
  return function (dispatch) {

    const accessToken = getCookie('accessToken');
    dispatch({ type: CHECK_AUTH });
    if (!!accessToken) {
      dispatch(getUser());
    }

    dispatch({ type: CHECK_AUTH_CHECKED });
  };
};



// clear errors region

export const clearPwdRecoverErr = () => ({ type: CLEAR_PWD_RECOVER_ERR });
export const clearPwdResetErr = () => ({ type: CLEAR_PWD_RESET_ERR });
export const clearRegisterError = () => ({ type: CLEAR_REGISTER_ERR });
export const clearLogInErr = () => ({ type: CLEAR_LOG_IN_ERR });
export const clearLogOutErr = () => ({ type: CLEAR_LOG_OUT_ERR });
export const clearGetUserErr = () => ({ type: CLEAR_GET_USER_ERR });
export const clearPatchUserErr = () => ({ type: CLEAR_PATCH_USER_ERR });
export const clearRefreshTokenErr = () => ({ type: CLEAR_REFRESH_TOKEN_ERR });