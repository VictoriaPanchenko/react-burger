import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';


export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    itemDetail: ingredientDetailReducer,
    order: orderReducer,
    ingredients: ingredientsReducer
});