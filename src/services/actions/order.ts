import { postOrder } from "../../api/api-requests";
import { AppDispatch, AppThunk } from "../store";
import { INewOrderResponse } from "../types/api";
import {
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
  CLEAR_ORDER_ERROR,
  OPEN_ORDER_DETAIL_MODAL,
  CLOSE_ORDER_DETAIL_MODAL,
} from "../constants/order";

export interface ICloseOrderModalAction {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IOpenOrderModalAction {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface IOpenOrderDetailModalAction {
  readonly type: typeof OPEN_ORDER_DETAIL_MODAL;
}

export interface ICloseOrderDetailModalAction {
  readonly type: typeof CLOSE_ORDER_DETAIL_MODAL;
}

export interface IResetOrderErrorAction {
  readonly type: typeof CLEAR_ORDER_ERROR;
}

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export type TOrderActions =
  | ICloseOrderModalAction
  | IOpenOrderModalAction
  | IOpenOrderDetailModalAction
  | ICloseOrderDetailModalAction
  | IResetOrderErrorAction
  | IPostOrderRequestAction
  | IPostOrderFailedAction
  | IPostOrderSuccessAction;

export function sendOrder(order: string[]): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch(orderRequest());
    postOrder(order)
      .then((res) => {
        dispatch(orderSuccess(res));
        dispatch(openOrderModal());
      })
      .catch(() => orderFailed());
  };
}
export function orderRequest(): IPostOrderRequestAction {
  return {
    type: POST_ORDER_REQUEST,
  };
}

export function orderFailed(): IPostOrderFailedAction {
  return {
    type: POST_ORDER_FAILED,
  };
}

export function orderSuccess(res: INewOrderResponse): IPostOrderSuccessAction {
  return {
    type: POST_ORDER_SUCCESS,
    orderNumber: res.order.number,
  };
}

export function closeOrderModal(): ICloseOrderModalAction {
  return {
    type: CLOSE_ORDER_MODAL,
  };
}

export function openOrderModal(): IOpenOrderModalAction {
  return {
    type: OPEN_ORDER_MODAL,
  };
}

export function openOrderDetailModal(): IOpenOrderDetailModalAction {
  return {
    type: OPEN_ORDER_DETAIL_MODAL,
  };
}

export function closeOrderDetailModal(): ICloseOrderDetailModalAction {
  return {
    type: CLOSE_ORDER_DETAIL_MODAL,
  };
}

export function clearOrderError(): IResetOrderErrorAction {
  return {
    type: CLEAR_ORDER_ERROR,
  };
}
