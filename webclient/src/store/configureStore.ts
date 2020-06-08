import {
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import reduxWebsocket from '@giantmachines/redux-websocket';

import { HP_WEBSOCKET_PREFIX } from './homepanelWebsocket/hpWebsocketActionTypes';

import { createReducer } from './reducers';

export function configureAppStore(history?: History) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware] as Middleware[];
  if (history) {
    middlewares.push(routerMiddleware(history));
  }

  // Create the Homepanel Websocket middleware instance.
  // Note: you can create other instances of the Websocket middleware here,
  // each with different prefix.
  const reduxHPWebsocketMiddleware = reduxWebsocket({
    prefix: HP_WEBSOCKET_PREFIX,
  });
  middlewares.push(reduxHPWebsocketMiddleware);

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...middlewares,
    ],
    devTools:
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}
