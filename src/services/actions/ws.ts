import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_WITH_TOKEN,
  WS_GET_MESSAGE,
  WS_RESET_ERROR_STATUS,
} from "../constants/ws";
import { IWsResponse } from "../types/api";

export interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsClose: typeof WS_CONNECTION_CLOSE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
  wsInitWithToken: typeof WS_CONNECTION_WITH_TOKEN;
}

export const wsActions: IWsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsInitWithToken: WS_CONNECTION_WITH_TOKEN,
};

export interface IWsInitWithTokenAction {
  readonly type: typeof WS_CONNECTION_WITH_TOKEN;
  readonly payload: string;
}

export interface IWsInitAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsResetError {
  readonly type: typeof WS_RESET_ERROR_STATUS;
}

export interface IWsOnCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsResponse;
}

export type TWsActions =
  | IWsCloseAction
  | IWsConnectionErrorAction
  | IWsConnectionSuccessAction
  | IWsGetMessageAction
  | IWsInitAction
  | IWsInitWithTokenAction
  | IWsOnCloseAction
  | IWsResetError;

export const wsInitWithToken = (url: string): IWsInitWithTokenAction => {
  return {
    type: WS_CONNECTION_WITH_TOKEN,
    payload: url,
  };
};
export const wsInit = (): IWsInitAction => ({ type: WS_CONNECTION_START });
export const wsConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
});
export const wsConnectionError = (): IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
});
export const wsClose = (): IWsCloseAction => ({ type: WS_CONNECTION_CLOSE });
export const wsResetError = (): IWsResetError => ({
  type: WS_RESET_ERROR_STATUS,
});
export const wsOnClose = (): IWsOnCloseAction => ({
  type: WS_CONNECTION_CLOSED,
});
export const wsGetMessage = (res: IWsResponse): IWsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload: res,
});
