import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import config from './../knexfile'
import './app.global.css';
import Database from './internals/Core/Database/Database'
const knex = require('knex');

// Database setup
const environment = 'development';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources/production-db.sqlite3');
export const knexClient = knex(config[environment]);
knexClient.migrate.latest(config);
export const bookshelf = require('bookshelf')(knexClient);
export const GameModel = bookshelf.Model.extend({
  tableName: 'games',
  platforms: function() {
    return this.belongsToMany(PlatformModel);
  }
});

export const PlatformModel = bookshelf.Model.extend({
  tableName: 'platforms',
  viewGames: function() {
    return this.belongsToMany(GameModel, 'platforms_games', 'platform_id', 'game_id').query({where: {access: 'readonly'}});
  }
});

export const LauncherModel = bookshelf.Model.extend({
  tableName: 'launchers',
  viewGames: function() {
    return this.belongsToMany(PlatformModel);
  }
});

Database.initializeDB();




const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
