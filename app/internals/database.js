const config =  require("../../knexfile")


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources/production-db.sqlite3');
const knex = require('knex');
const environment = 'development';


const knexClient = knex(config[environment]);

knexClient.migrate.latest(config);

// Model Definitions
const Bookshelf  = require('bookshelf')(knexClient);

Bookshelf.plugin('registry'); // Resolve circular dependencies with relations
Bookshelf.plugin('visibility');


module.exports = Bookshelf;
