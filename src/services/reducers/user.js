import {
    PWD_RECOVER_FAILED,
    PWD_RECOVER_REQUEST,
    PWD_RECOVER_SUCCESS,
    CLEAR_PWD_RECOVER_ERR,
    PWD_RESET_REQUEST,
    PWD_RESET_SUCCESS,
    PWD_RESET_FAILED,
    CLEAR_PWD_RESET_ERR,
    REGISTR_USER_REQUEST,
    REGISTR_USER_SUCCESS,
    REGISTR_USER_FAILED,
    CLEAR_REGISTER_ERR,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    CLEAR_LOG_IN_ERR,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILED,
    CLEAR_LOG_OUT_ERR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    CLEAR_GET_USER_ERR,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
    CLEAR_PATCH_USER_ERR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    CLEAR_REFRESH_TOKEN_ERR,
    CHECK_AUTH,
    CHECK_AUTH_CHECKED
} from '../actions/user';

const initialState = {
    user: null,
    isAuthChecked: false,

    errMessage: '',

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

    refreshTokenRequest: false,
    refreshTokenFailed: false,

    checkAuthRequest: false,
    checkAuthFailed: false
};


export const userReducer = (state = initialState, action) => {
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
                errMessage: action.err,
            };
        }
        case CLEAR_GET_USER_ERR: {
            return {
                ...state,
                getUserFailed: false,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_PATCH_USER_ERR: {
            return {
                ...state,
                patchUserFailed: false,
                isUserChanged: false,
                errMessage: '',
            };
        }
        case REGISTR_USER_REQUEST: {
            return {
                ...state,
                registerUserRequest: true,
                registerUserErr: false,
                registerSuccess: false,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_REGISTER_ERR: {
            return {
                ...state,
                registerUserErr: false,
                errMessage: '',
            };
        }

        case PWD_RECOVER_REQUEST: {
            return {
                ...state,
                passwordRecoverRequest: true,
                passwordRecoverErr: false,
                canResetPassword: null,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_PWD_RECOVER_ERR: {
            return {
                ...state,
                passwordRecoverErr: false,
                errMessage: '',
            };
        }
        case PWD_RESET_REQUEST: {
            return {
                ...state,
                passwordResetRequest: true,
                passwordResetErr: false,
                isPasswordReset: false,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_PWD_RESET_ERR: {
            return {
                ...state,
                passwordResetErr: false,
                errMessage: '',
            };
        }
        case LOG_IN_REQUEST: {
            return {
                ...state,
                logInRequest: true,
                logInErr: false,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_LOG_IN_ERR: {
            return {
                ...state,
                logInErr: false,
                errMessage: '',
            };
        }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                logOutRequest: true,
                logOutErr: false,
                errMessage: '',
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
                errMessage: action.err,
            };
        }
        case CLEAR_LOG_OUT_ERR: {
            return {
                ...state,
                logOutErr: false,
                errMessage: '',
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
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenFailed: false,
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: false,
            };
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true,
                errMessage: action.err,
            };
        }
        case CLEAR_REFRESH_TOKEN_ERR: {
            return {
                ...state,
                refreshTokenFailed: false,
                errMessage: '',
            };
        }

        default: {
            return state;
        }
    }
};
