import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureDevices } from './configuration/startup';
import "typeface-lato";
import { configureConnectors } from './configuration/connectorsConfig';



(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await configureDevices()
    await configureConnectors(store)
})();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
