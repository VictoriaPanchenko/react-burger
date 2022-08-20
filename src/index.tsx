import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';
import { createRoot } from 'react-dom/client';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  reportWebVitals();