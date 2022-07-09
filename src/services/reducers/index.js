import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';


export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    itemDetail: ingredientDetailReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    user: userReducer,
});