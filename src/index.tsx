import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  reportWebVitals();