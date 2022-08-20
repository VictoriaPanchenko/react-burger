import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    CLEAR_INGREDIENTS_ERROR
} from '../constants/ingredients';
import { getInitialIngredients } from '../../api/api-requests';
import { AppDispatch, AppThunk } from '../store';
import { IIngredient } from '../types';
import { IIngredientResponse } from '../types/api';


export function getIngredients(): AppThunk {
    return function (dispatch) {
      dispatch(getIngredientsRequest());
      getInitialIngredients()
        .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data }))
        .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
    };
  }

  export interface IResetIngredientsErrorAction {
    readonly type: typeof CLEAR_INGREDIENTS_ERROR;
  }
  
  export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
  }
  
  export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
  }
  
  export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: IIngredient[];
  }

  export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IResetIngredientsErrorAction;

  
  export function getIngredientsRequest(): IGetIngredientsRequestAction {
    return {
      type: GET_INGREDIENTS_REQUEST,
    };
  }

  export function getIngredientsSuccess(res: IIngredientResponse): IGetIngredientsSuccessAction {
    return {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: res.data,
    };
  }

  export function getIngredientsFailed(): IGetIngredientsFailedAction {
    return {
      type: GET_INGREDIENTS_FAILED,
    };
  }

  export function clearIngredientsError(): IResetIngredientsErrorAction {
    return {
      type: CLEAR_INGREDIENTS_ERROR,
    };
  }