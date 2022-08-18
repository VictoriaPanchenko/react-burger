import {
  sendEmailToRestorePassword,
  updatePassword,
  registerNewUser,
  getUserInfo,
  updateUserInfo,
  login,
  logout,
} from "../../api/api-requests";
import { setCookie, deleteCookie, getCookie } from "../cookie-setting";
import { IUser } from "../types/api";
import {
  PWD_RECOVER_INITIAL,
  PWD_RECOVER_FAILED,
  PWD_RECOVER_REQUEST,
  PWD_RECOVER_SUCCESS,
  CLEAR_PWD_RECOVER_ERR,
  PWD_RESET_INITIAL,
  PWD_RESET_REQUEST,
  PWD_RESET_SUCCESS,
  PWD_RESET_FAILED,
  CLEAR_PWD_RESET_ERR,
  REGISTR_USER_REQUEST,
  REGISTR_USER_SUCCESS,
  REGISTR_USER_FAILED,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  CHECK_AUTH,
  CHECK_AUTH_CHECKED,
} from "../constants/user";
import { AppDispatch, AppThunk } from "../store";

export interface IClearPwdRecoveryErrorAction {
  readonly type: typeof CLEAR_PWD_RECOVER_ERR;
}

export interface IClearPwdResetErrorAction {
  readonly type: typeof CLEAR_PWD_RESET_ERR;
}

export interface IPwdRecoverInitAction {
  readonly type: typeof PWD_RECOVER_INITIAL;
}

export interface IPwdResetInitAction {
  readonly type: typeof PWD_RESET_INITIAL;
}

export interface ILoginRequestAction {
  readonly type: typeof LOG_IN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOG_IN_SUCCESS;
  readonly user: IUser;
}
export interface ILoginFailedAction {
  readonly type: typeof LOG_IN_FAILED;
  readonly errMsg: string;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOG_OUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOG_OUT_SUCCESS;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOG_OUT_FAILED;
  readonly errMsg: string;
}

export interface IPwdResetRequestAction {
  readonly type: typeof PWD_RESET_REQUEST;
}

export interface IPwdResetSuccessAction {
  readonly type: typeof PWD_RESET_SUCCESS;
  readonly success: boolean;
}
export interface IPwdResetFailedAction {
  readonly type: typeof PWD_RESET_FAILED;
  readonly errMsg: string;
}

export interface IPwdRecoverRequestAction {
  readonly type: typeof PWD_RECOVER_REQUEST;
}

export interface IPwdRecoverSuccessAction {
  readonly type: typeof PWD_RECOVER_SUCCESS;
  readonly success: boolean;
}
export interface IPwdRecoverFailedAction {
  readonly type: typeof PWD_RECOVER_FAILED;
  readonly errMsg: string;
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTR_USER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTR_USER_SUCCESS;
  readonly user: IUser;
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTR_USER_FAILED;
  readonly errMsg: string;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: IUser;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly errMsg: string;
}

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly user: IUser;
}
export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
  readonly errMsg: string;
}

export interface ICheckAuthAction {
  readonly type: typeof CHECK_AUTH;
}
export interface IAuthCheckedAction {
  readonly type: typeof CHECK_AUTH_CHECKED;
}

export type TUserActions =
  | IClearPwdRecoveryErrorAction
  | IClearPwdResetErrorAction
  | IPwdRecoverInitAction
  | IPwdResetInitAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IPwdResetRequestAction
  | IPwdResetSuccessAction
  | IPwdResetFailedAction
  | IPwdRecoverRequestAction
  | IPwdRecoverSuccessAction
  | IPwdRecoverFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPatchUserFailedAction
  | ICheckAuthAction
  | IAuthCheckedAction;

export const clearPwdRecoverErr = (): IClearPwdRecoveryErrorAction => ({
  type: CLEAR_PWD_RECOVER_ERR,
});

export const clearPwdResetErr = (): IClearPwdResetErrorAction => ({
  type: CLEAR_PWD_RESET_ERR,
});

export const pwdRecoveryInit = (): IPwdRecoverInitAction => ({
  type: PWD_RECOVER_INITIAL,
});

export const pwdResetInit = (): IPwdResetInitAction => ({
  type: PWD_RESET_INITIAL,
});

export const loginRequest = (): ILoginRequestAction => ({
  type: LOG_IN_REQUEST,
});
export const loginSuccess = (user: IUser): ILoginSuccessAction => ({
  type: LOG_IN_SUCCESS,
  user,
});
export const loginFailed = (errMsg: string): ILoginFailedAction => ({
  type: LOG_IN_FAILED,
  errMsg,
});

export const registerRequest = (): IRegisterRequestAction => ({
  type: REGISTR_USER_REQUEST,
});
export const registerSuccess = (user: IUser): IRegisterSuccessAction => ({
  type: REGISTR_USER_SUCCESS,
  user,
});
export const registerFailed = (errMsg: string): IRegisterFailedAction => ({
  type: REGISTR_USER_FAILED,
  errMsg,
});

export const getUserRequest = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST,
});
export const getUserSuccess = (user: IUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user,
});
export const getUserFailed = (errMsg: string): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
  errMsg,
});

export const patchUserRequest = (): IPatchUserRequestAction => ({
  type: PATCH_USER_REQUEST,
});
export const patchUserSuccess = (user: IUser): IPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  user,
});
export const patchUserFailed = (errMsg: string): IPatchUserFailedAction => ({
  type: PATCH_USER_FAILED,
  errMsg,
});

export const logoutRequest = (): ILogoutRequestAction => ({
  type: LOG_OUT_REQUEST,
});
export const logoutSuccess = (): ILogoutSuccessAction => ({
  type: LOG_OUT_SUCCESS,
});
export const logoutFailed = (errMsg: string): ILogoutFailedAction => ({
  type: LOG_OUT_FAILED,
  errMsg,
});

export const pwdResetRequest = (): IPwdResetRequestAction => ({
  type: PWD_RESET_REQUEST,
});
export const pwdResetSuccess = (success: boolean): IPwdResetSuccessAction => ({
  type: PWD_RESET_SUCCESS,
  success,
});
export const pwdResetFailed = (errMsg: string): IPwdResetFailedAction => ({
  type: PWD_RESET_FAILED,
  errMsg,
});

export const pwdRecoverRequest = (): IPwdRecoverRequestAction => ({
  type: PWD_RECOVER_REQUEST,
});
export const pwdRecoverSuccess = (
  success: boolean
): IPwdRecoverSuccessAction => ({
  type: PWD_RECOVER_SUCCESS,
  success,
});
export const pwdRecoverFailed = (errMsg: string): IPwdRecoverFailedAction => ({
  type: PWD_RECOVER_FAILED,
  errMsg,
});

export const checkAuthAction = (): ICheckAuthAction => ({ type: CHECK_AUTH });
export const authChecked = (): IAuthCheckedAction => ({
  type: CHECK_AUTH_CHECKED,
});

export const resetPasswordRecoverPageToInitial = (): AppThunk => {
  return function (dispatch) {
    dispatch(pwdRecoveryInit());
  };
};

export const resetPasswordResetPageToInitial = (): AppThunk => {
  return function (dispatch) {
    dispatch(pwdResetInit());
  };
};

export const loginUser = (email: string, password: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequest());
    login(email, password)
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(loginSuccess(res.user));
      })
      .catch((err) => {
        dispatch(loginFailed(err.message));
      });
  };
};

export const logoutUser = (): AppThunk => {
  return function (dispatch) {
    dispatch(logoutRequest());
    logout()
      .then((res) => {
        deleteCookie("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logoutSuccess());
      })
      .catch((err) => dispatch(logoutFailed(err.message)));
  };
};

export const createNewUser = (
  email: string,
  password: string,
  name: string
): AppThunk => {
  return function (dispatch) {
    dispatch(registerRequest());

    registerNewUser(email, password, name)
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(registerSuccess(res.user));
      })
      .catch((err) => {
        dispatch(registerFailed(err.message));
      });
  };
};

export const getUser = (): AppThunk => {
  return function (dispatch) {
    dispatch(getUserRequest());
    getUserInfo()
      .then((res) => dispatch(getUserSuccess(res.user)))
      .catch((err) => {
        dispatch(getUserFailed(err.message));
      });
  };
};

export const patchUser = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): AppThunk => {
  return function (dispatch) {
    dispatch(patchUserRequest());
    updateUserInfo(name, email, password)
      .then((res) => dispatch(patchUserSuccess(res.user)))
      .catch((err) => {
        dispatch(patchUserFailed(err.message));
      });
  };
};

export const resetPassword = (password: string, token: string): AppThunk => {
  return function (dispatch) {
    dispatch(pwdResetRequest());
    updatePassword(password, token)
      .then((res) => dispatch(pwdResetSuccess(res.success)))
      .catch((err) => dispatch(pwdResetFailed(err.message)));
  };
};

export const sendRecoverPasswordEmail = (email: string): AppThunk => {
  return function (dispatch) {
    dispatch(pwdRecoverRequest());
    sendEmailToRestorePassword(email)
      .then((res) => dispatch(pwdRecoverSuccess(res.success)))
      .catch((err) => dispatch(pwdRecoverFailed(err.message)));
  };
};

export const checkAuth = (): AppThunk => {
  return function (dispatch) {
    const accessToken = getCookie("accessToken");
    dispatch(checkAuthAction());
    if (!!accessToken) {
      dispatch(getUser());
    }

    dispatch(authChecked());
  };
};
