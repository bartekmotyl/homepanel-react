import React from 'react';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureDevices } from './configuration/startup';
import "typeface-lato";
import { configureConnectors } from './configuration/connectorsConfig';
import { createRoot } from 'react-dom/client';


(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await configureDevices()
    await configureConnectors(store)
})();

const container = document.getElementById('root')
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
