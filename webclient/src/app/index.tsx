/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePanel } from './containers/HomePanel';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';

export function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={HomePanel}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
