import { IWsActions } from "../services/actions/ws";
import { AppDispatch, RootState } from "../services/store";
import { Middleware, MiddlewareAPI } from "redux";

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsClose, wsInitWithToken } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(wsUrl);
        }  
        else if (type === wsInitWithToken) {
          socket = new WebSocket(payload);
        }  
        else if (type === wsClose) {
          socket && socket.close();
        }
  
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
          };
  
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: restParsedData });
          };
        }
  
        next(action);
      };
    };
  };
  