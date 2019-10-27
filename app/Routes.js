import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import MainNav from './components/MainNav/MainNav';
import LibraryHome from './containers/Library/LibraryHome'
import SettingsPage from './containers/SettingsPage'
import MessagesPage from './containers/Messaging/MessagesContainer'
import Login from './containers/Login'


// Always keep the

export default () => (
  <App>
    <div className="d-flex height-full">
      <MainNav/>
      <Switch>
        <Route path={routes.LOGIN} component={Login}/>
        <Route path={routes.LIBRARY} component={LibraryHome} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
        <Route path={routes.MESSAGES} component={MessagesPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </div>
  </App>
);
