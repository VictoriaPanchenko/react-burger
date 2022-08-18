import { createStore, applyMiddleware, compose, Dispatch } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socket-middleware';
import { wsUrl } from '../utils/constants';
import { TApplicationActions } from './types';
import { wsActions } from './actions/ws';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

//export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppDispatch = Dispatch<TApplicationActions>; 

export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);

