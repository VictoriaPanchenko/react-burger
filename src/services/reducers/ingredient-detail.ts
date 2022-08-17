import { OPEN_DETAIL, CLOSE_DETAIL } from "../constants/ingredient-detail";
import { IIngredient } from "../types";
import { TDetailActions } from "../actions/ingredient-detail";

type TDetailState = {
  selectedIngredient: IIngredient | null;
  isDetailOpened: boolean;
};

const initialState: TDetailState = {
  selectedIngredient: null,
  isDetailOpened: false,
};

export const ingredientDetailReducer = (
  state = initialState,
  action: TDetailActions
): TDetailState => {
  switch (action.type) {
    case OPEN_DETAIL: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
        isDetailOpened: true,
      };
    }
    case CLOSE_DETAIL: {
      return {
        ...state,
        isDetailOpened: false,
        selectedIngredient: null,
      };
    }
    default:
      return state;
  }
};
