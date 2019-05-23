import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {getDirectory} from './internals/Core/Parser';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import config from './../knexfile'
import './app.global.css';
import Database from './internals/Core/Database/Database'
import {setInstGamesRedux} from './actions/library';
const knex = require('knex');
// Database setup
const environment = 'development';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources/production-db.sqlite3');
export const knexClient = knex(config[environment]);
knexClient.migrate.latest(config);

const path = require('path');

// Model Definitions
export const bookshelf = require('bookshelf')(knexClient);
// TODO: Export these to sepear module or into Database class
export const GameModel = bookshelf.Model.extend({
  tableName: 'games',
  platforms: function() {
    return this.belongsToMany(PlatformModel, 'platforms_games','game_id', 'platform_id').query({where: {access: 'readonly'}});
  },
  initialize() {
    this.on('saved', (model) => {
      // This is fired after a model is updated
      store.dispatch(setInstGamesRedux())
    })
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
  },
  initialize() {
    this.on('saved', (model) => {
      // This is fired after a model is updated
        if(model.hasOwnProperty('attachedLauncher')){
              this.attachLauncher.path_to_executable = model.attributes.path_to_executable;
              this.install_folder = path.dirname(this.attachLauncher.path_to_executable);
        }
    })
    this.on('saving', (model) => {
      if (model.get('status') !== 'active') {
        // Throwing an error will prevent the model from being saved
      }
    })
  }
});

export type LauncherModelType = LauncherModel;

Database.initializeDB();




const store = configureStore();

store.dispatch(setInstGamesRedux())

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
