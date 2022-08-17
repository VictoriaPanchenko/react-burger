import { getOrderInfo } from "../../api/api-requests";
import { AppDispatch } from "../store";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
    WS_GET_USER_ORDERS,
    WS_USER_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    GET_ORDER_INFO,
    GET_ORDER_INFO_SUCCESS,
    GET_ORDER_INFO_FAILED,
    CLEAN_ORDER_INFO,
  } from '../constants/ws';
import { IWsResponse } from "../types/api";
import { IWsOrder } from "../types";
  
  export const wsAllOrdersActions = {
    wsInit: WS_CONNECTION_START,
    //onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    //onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ALL_ORDERS,
  };
  
  export const wsUserOrdersActions = {
    wsInitWithToken: WS_USER_ORDERS_CONNECTION_START,
    onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
    onError: WS_USER_ORDERS_CONNECTION_ERROR,
    onMessage: WS_GET_USER_ORDERS,
  };
  
  export interface IWsInitAction {
    readonly type: typeof WS_CONNECTION_START;
  }
  
  export interface IWsCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
  }
  
  export interface IWsUserOrdersStartAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
    readonly payload: string;
  }
  
  export interface IWsUserOrdersCloseAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
  }
  
  export interface IWsOrderInfoRequestAction {
    readonly type: typeof GET_ORDER_INFO;
  }

  export interface IWsOrderInfoFailedAction {
    readonly type: typeof GET_ORDER_INFO_FAILED;
  }

  export interface IWsOrderInfoSuccessAction {
    readonly type: typeof GET_ORDER_INFO_SUCCESS;
    readonly payload: IWsOrder
  }

  export interface IWsCleanOrderInfoAction {
    readonly type: typeof CLEAN_ORDER_INFO;
  }

  export type TWsActions =
  | IWsInitAction
  | IWsCloseAction
  | IWsUserOrdersStartAction
  | IWsUserOrdersCloseAction
  | IWsOrderInfoRequestAction
  | IWsOrderInfoFailedAction
  | IWsOrderInfoSuccessAction
  | IWsCleanOrderInfoAction;

  export const wsAllOrdersConnectionStart = ():IWsInitAction => ({
    type: WS_CONNECTION_START,
  });
  
  export const wsUserOrdersConnectionStart = (url:string):IWsUserOrdersStartAction => ({
    type: WS_USER_ORDERS_CONNECTION_START, 
    payload: url,
  });
  
  export const wsAllOrdersConnectionClosed = () :IWsCloseAction => ({
    type: WS_CONNECTION_CLOSED,
  });
  
  export const wsUserOrdersConnectionClosed = ():IWsUserOrdersCloseAction => ({
    type: WS_USER_ORDERS_CONNECTION_CLOSED,
  });
  
  export const getOrderInfoLoading = ():IWsOrderInfoRequestAction => ({ type: GET_ORDER_INFO });
  export const getOrderInfoLoadingSuccess = (data:IWsResponse) : IWsOrderInfoSuccessAction => ({ type: GET_ORDER_INFO_SUCCESS, payload: data.orders[0] });
  export const getOrderInfoLoadingFailed = () :IWsOrderInfoFailedAction => ({ type: GET_ORDER_INFO_FAILED });
  export const cleanOrderInfo = () :IWsCleanOrderInfoAction  => ({ type: CLEAN_ORDER_INFO });
  
  export const getOrderInfoDetails = (orderNumber:number) => (dispatch:AppDispatch) => {
    dispatch(getOrderInfoLoading());
    getOrderInfo(orderNumber)
      .then((data) => {
        if (data) {
          dispatch(getOrderInfoLoadingSuccess(data)); 
        }
      })
      .catch(() => dispatch(getOrderInfoLoadingFailed()));
  };
  