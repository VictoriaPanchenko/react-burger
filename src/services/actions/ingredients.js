import { getInitialIngredients } from '../../api/api-requests';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const CLEAR_INGREDIENTS_ERROR = 'CLEAR_INGREDIENTS_ERROR';

export function getIngredients() {
    return function (dispatch) {
      dispatch({ type: GET_INGREDIENTS_REQUEST });
      getInitialIngredients()
        .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data }))
        .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
    };
  }

  export function clearIngredientsError() {
    return {
      type: CLEAR_INGREDIENTS_ERROR,
    };
  }