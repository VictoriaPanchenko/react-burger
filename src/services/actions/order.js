import { postOrder } from '../../api/api-requests';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLEAR_ORDER_ERROR = 'CLEAR_ORDER_ERROR';
export const CLOSE_ORDER_DETAIL_MODAL = 'CLOSE_ORDER_DETAIL_MODAL';
export const OPEN_ORDER_DETAIL_MODAL = 'OPEN_ORDER_DETAIL_MODAL';

export function sendOrder(order) {
    return function (dispatch) {
      dispatch({ type: POST_ORDER_REQUEST });
      postOrder(order)
        .then(res => {
          dispatch({ type: POST_ORDER_SUCCESS, orderNumber: res.order.number })
          dispatch({type: OPEN_ORDER_MODAL})})
        .catch(() => dispatch({ type: POST_ORDER_FAILED }));
    };
  }
  
  export function closeOrderModal() {
    return {
      type: CLOSE_ORDER_MODAL,
    };
  }

  export function openOrderDetailModal() {
    return {
      type: OPEN_ORDER_DETAIL_MODAL,
    };
  }

  export function closeOrderDetailModal() {
    return {
      type: CLOSE_ORDER_DETAIL_MODAL,
    };
  }

  export function clearOrderError() {
    return {
      type: CLEAR_ORDER_ERROR,
    };
  }