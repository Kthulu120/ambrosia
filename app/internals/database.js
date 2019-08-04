'use strict';
const config =  require("../../knexfile")


const knex = require('knex');
const environment = 'development';


const knexClient = knex(config[environment]);

knexClient.migrate.latest(config);

// Model Definitions
const Bookshelf  = require('bookshelf')(knexClient);

Bookshelf.plugin('registry'); // Resolve circular dependencies with relations
Bookshelf.plugin('visibility');


module.exports = Bookshelf;
