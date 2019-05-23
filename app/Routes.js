import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TitleBar from './components/TitleBar/TitleBar';
import LibraryHome from './containers/Library/LibraryHome'

export default () => (
  <App>
    <TitleBar/>
    <Switch>
      <Route path={routes.LIBRARY} component={LibraryHome} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
