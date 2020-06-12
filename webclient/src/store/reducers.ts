/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';

import { history } from 'utils/history';
import { InjectedReducersType } from 'utils/types/injector-typings';
import homepanelWebsocketReducer from './homepanelWebsocket/hpWebsocketReducer';
import mockConnectorReducer from './connectors/mockConnector/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    router: connectRouter(history) as Reducer<RouterState, AnyAction>,

    // Below are reducers that expose state implementing DevicesState
    homepanel: homepanelWebsocketReducer,
    mock: mockConnectorReducer,
  });

  return rootReducer;
}
