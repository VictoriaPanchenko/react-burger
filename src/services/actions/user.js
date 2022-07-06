import { sendEmailToRestorePassword, updatePassword, registerNewUser } from '../../api/api-requests';
import { setCookie } from '../cookie-setting';

export const REGISTR_USER_REQUEST = 'REGISTR_USER_REQUEST';
export const REGISTR_USER_SUCCESS = 'REGISTR_USER_SUCCESS';
export const REGISTR_USER_FAILED = 'REGISTR_USER_FAILED';
export const CLEAR_REGISTER_ERR = 'CLEAR_REGISTER_ERR';

export const PWD_RECOVER_REQUEST = 'PWD_RECOVER_REQUEST';
export const PWD_RECOVER_FAILED = 'PWD_RECOVER_FAILED';
export const PWD_RECOVER_SUCCESS = 'PWD_RECOVER_SUCCESS';
export const CLEAR_PWD_RECOVER_ERR = 'CLEAR_PWD_RECOVER_ERR';

export const PWD_RESET_REQUEST = 'PWD_RESET_REQUEST';
export const PWD_RESET_SUCCESS = 'PWD_RESET_SUCCESS';
export const PWD_RESET_FAILED = 'PWD_RESET_FAILED';
export const CLEAR_PWD_RESET_ERR = 'CLEAR_PWD_RESET_ERR';


export const clearPwdRecoverErr = () => ({ type: CLEAR_PWD_RECOVER_ERR });
export const clearPwdResetErr = () => ({ type: CLEAR_PWD_RESET_ERR });
export const clearRegisterError = () => ({ type: CLEAR_REGISTER_ERR });

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