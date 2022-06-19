import { OPEN_DETAIL, CLOSE_DETAIL } from '../actions/ingredient-detail';

const initialState = {
    selectedIngredient: null,
    isDetailOpened: false
  };

export const ingredientDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DETAIL: {
            return {
                ...state,
                selectedIngredient: action.ingredient,
                isDetailOpened: true
            };
        }
        case CLOSE_DETAIL: {
            return {
                ...state,
                isDetailOpened: false,
                selectedIngredient: null
            }
        }
        default: 
            return state;
    }
}