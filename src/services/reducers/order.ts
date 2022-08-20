import { TOrderActions } from "../actions/order";
import {
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
  CLEAR_ORDER_ERROR,
} from "../constants/order";

type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderNumber: number | null;
  isOrderModalOpened: boolean;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null,
  isOrderModalOpened: false
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
      };
    case POST_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.orderNumber,
      };
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        orderNumber: null,
        isOrderModalOpened: false,
      };
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        isOrderModalOpened: true,
      };
    case CLEAR_ORDER_ERROR: {
      return {
        ...state,
        orderFailed: false,
      };
    }
    default:
      return state;
  }
};
