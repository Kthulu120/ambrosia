import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TitleBar from './components/TitleBar/TitleBar';
import LibraryHome from './containers/Library/LibraryHome'
import SettingsPage from './containers/SettingsPage'
import Login from './containers/Login'


export default () => (
  <App>
    <TitleBar/>
    <Switch>
      <Route path={routes.LOGIN} component={Login}/>
      <Route path={routes.LIBRARY} component={LibraryHome} />
      <Route path={routes.SETTINGS} component={SettingsPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
