import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    CLEAR_INGREDIENTS_ERROR
} from '../actions/ingredients';

const initialState = {
    ingredientsArray: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredients: action.ingredients,
                ingredientsFailed: false
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        case CLEAR_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsFailed: false
            };
        }
        default:
            return state;
    }
};