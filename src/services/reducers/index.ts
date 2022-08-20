import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { ordersInfoReducer } from './ws';


export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    user: userReducer,
    ws: ordersInfoReducer //ws
});