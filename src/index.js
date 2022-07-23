import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers';
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { wsUrl } from './utils/constants';
import { wsActions } from './services/actions/ws';
import { socketMiddleware } from './middleware/socket-middleware';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
      <BrowserRouter basename="/react-burger">
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
