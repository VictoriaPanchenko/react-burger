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
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default: {
            return state;
        }
    }
};
