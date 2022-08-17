import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { ordersInfoReducer } from './ws';


export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    itemDetail: ingredientDetailReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    user: userReducer,
    ordersInfoFeed: ordersInfoReducer
});