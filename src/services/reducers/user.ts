import { IUser } from "../types/api";
import { TUserActions } from "../actions/user";
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

type TUserState = {
  user: IUser | null;
  isAuthChecked: boolean;

  errMessage: string;

  registerUserRequest: boolean;
  registerUserErr: boolean;
  registerSuccess: boolean;

  passwordRecoverRequest: boolean;
  passwordRecoverErr: boolean;
  canResetPassword: boolean | null;

  passwordResetRequest: boolean;
  passwordResetErr: boolean;
  isPasswordReset: boolean | null;

  logInRequest: boolean;
  logInErr: boolean;
  logOutRequest: boolean;
  logOutErr: boolean;

  getUserRequest: boolean;
  getUserFailed: boolean;

  patchUserRequest: boolean;
  patchUserFailed: boolean;
  isUserChanged: boolean;

  checkAuthRequest: boolean;
  checkAuthFailed: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,

  errMessage: "",

  registerUserRequest: false,
  registerUserErr: false,
  registerSuccess: false,

  passwordRecoverRequest: false,
  passwordRecoverErr: false,
  canResetPassword: null,

  passwordResetRequest: false,
  passwordResetErr: false,
  isPasswordReset: null,

  logInRequest: false,
  logInErr: false,
  logOutRequest: false,
  logOutErr: false,

  getUserRequest: false,
  getUserFailed: false,

  patchUserRequest: false,
  patchUserFailed: false,
  isUserChanged: false,

  checkAuthRequest: false,
  checkAuthFailed: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        errMessage: action.errMsg,
      };
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserFailed: false,
        isUserChanged: false,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: false,
        isUserChanged: true,
        user: action.user,
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
        isUserChanged: false,
        errMessage: action.errMsg,
      };
    }
    case REGISTR_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserErr: false,
        registerSuccess: false,
        errMessage: "",
      };
    }
    case REGISTR_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserErr: false,
        registerSuccess: true,
        user: action.user,
      };
    }
    case REGISTR_USER_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerSuccess: false,
        registerUserErr: true,
        errMessage: action.errMsg,
      };
    }

    case PWD_RECOVER_REQUEST: {
      return {
        ...state,
        passwordRecoverRequest: true,
        passwordRecoverErr: false,
        canResetPassword: null,
        errMessage: "",
      };
    }
    case PWD_RECOVER_INITIAL: {
      return {
        ...state,
        passwordRecoverRequest: false,
        passwordRecoverErr: false,
        canResetPassword: null,
        errMessage: "",
      };
    }
    case PWD_RECOVER_SUCCESS: {
      return {
        ...state,
        passwordRecoverRequest: false,
        passwordRecoverErr: false,
        canResetPassword: action.success,
      };
    }
    case PWD_RECOVER_FAILED: {
      return {
        ...state,
        passwordRecoverRequest: false,
        passwordRecoverErr: true,
        canResetPassword: false,
        errMessage: action.errMsg,
      };
    }
    case CLEAR_PWD_RECOVER_ERR: {
      return {
        ...state,
        passwordRecoverErr: false,
        errMessage: "",
      };
    }
    case PWD_RESET_INITIAL: {
      return {
          ...state,
          passwordResetRequest: false,
          passwordResetErr: false,
          isPasswordReset: false,
          errMessage: '',
      };
  }
    case PWD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetErr: false,
        isPasswordReset: false,
        errMessage: "",
      };
    }
    case PWD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetErr: false,
        isPasswordReset: action.success,
      };
    }
    case PWD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetErr: true,
        isPasswordReset: false,
        errMessage: action.errMsg,
      };
    }
    case CLEAR_PWD_RESET_ERR: {
      return {
        ...state,
        passwordResetErr: false,
        errMessage: "",
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInRequest: true,
        logInErr: false,
        errMessage: "",
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInRequest: false,
        logInErr: false,
        user: action.user,
      };
    }
    case LOG_IN_FAILED: {
      return {
        ...state,
        logInRequest: false,
        logInErr: true,
        errMessage: action.errMsg,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutRequest: true,
        logOutErr: false,
        errMessage: "",
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logOutRequest: false,
        logOutErr: false,
        user: null,
      };
    }
    case LOG_OUT_FAILED: {
      return {
        ...state,
        logOutRequest: false,
        logOutErr: true,
        errMessage: action.errMsg,
      };
    }
    case CHECK_AUTH: {
      return {
        ...state,
        checkAuthRequest: true,
        checkAuthFailed: false,
        isAuthChecked: false,
      };
    }
    case CHECK_AUTH_CHECKED: {
      return {
        ...state,
        checkAuthRequest: false,
        checkAuthFailed: false,
        isAuthChecked: true,
      };
    }

    default: {
      return state;
    }
  }
};
