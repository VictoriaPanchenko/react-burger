import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAR_INGREDIENTS_ERROR,
} from "../constants/ingredients";
import { TIngredientsActions } from "../actions/ingredients";
import { IIngredient } from "../types";

type TIngredientsState = {
  ingredientsArray: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredientsArray: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsArray: action.ingredients,
        ingredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    case CLEAR_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsFailed: false,
      };
    }
    default:
      return state;
  }
};
