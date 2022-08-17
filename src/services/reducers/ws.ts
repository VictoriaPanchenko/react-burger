import { TWsActions } from '../actions/ws';
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_WITH_TOKEN,
  WS_GET_MESSAGE,
  WS_RESET_ERROR_STATUS,
  } from '../constants/ws';
import { IWsOrder } from "../types";

export interface IWsState {
  wsRequest: boolean;
  wsOpen: boolean;
  wsFailed: boolean;
  orders: IWsOrder[] | null;
  total: number | null;
  totalToday: number | null;
}


const initialState: IWsState = {
  wsRequest: false,
  wsOpen: false,
  wsFailed: false,
  orders: null,
  total: null,
  totalToday: null,
};
  
  export const ordersInfoReducer = (state = initialState, action: TWsActions): IWsState => {
    switch (action.type) {
      case WS_CONNECTION_START: {
        return {
          ...state,
          wsRequest: true,
          wsOpen: false,
          wsFailed: false,
        };
      }
      case WS_CONNECTION_WITH_TOKEN: {
        return {
          ...state,
          wsRequest: true,
          wsOpen: false,
          wsFailed: false,
        };
      }
      case WS_CONNECTION_SUCCESS: {
        return {
          ...state,
          wsRequest: false,
          wsFailed: false,
          wsOpen: true,
        };
      }
      case WS_CONNECTION_ERROR: {
        return {
          ...state,
          wsRequest: false,
          wsOpen: false,
          wsFailed: true,
        };
      }
      case WS_CONNECTION_CLOSED: {
        return {
          ...state,
          wsRequest: false,
          wsOpen: false,
          wsFailed: false,
          orders: null,
          total: null,
          totalToday: null,
        };
      }
      case WS_GET_MESSAGE: {
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
      }
      case WS_RESET_ERROR_STATUS: {
        return {
          ...state,
          wsRequest: false,
          wsOpen: false,
          wsFailed: false,
          orders: null,
          total: null,
          totalToday: null,
        };
      }
      default: {
        return state;
      }
    }
  };
  