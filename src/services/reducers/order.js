import {
    POST_ORDER_REQUEST,
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    CLOSE_ORDER_MODAL
} from '../actions/order';

const initialState = {
    orderRequest: false,
    orderFailed: false,
    orderNumber: null,
    isOrderOpened: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            };
        case POST_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                orderNumber: action.orderNumber,
                isOrderOpened: true
            };
        case CLOSE_ORDER_MODAL:
            return {
                ...state,
                isOrderModalOpened: false,
                orderNumber: null,
                isOrderOpened: false
            }
        default:
            return state;
    }
};