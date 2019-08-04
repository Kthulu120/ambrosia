
import Ambrosia from './Ambrosia'
import config from "../../knexfile"
import Database from './Core/Database/Database'
import config from "../../knexfile"

// Main internal setup for the appilcation
export const AmbrosiaApp = new Ambrosia()


const knex = require('knex');
// Database setup
const environment = 'development';
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('resources/production-db.sqlite3');
export const knexClient = knex(config[environment]);

const mainDB = new Database(knexClient);

knexClient.migrate.latest(config);

// Model Definitions
export const bookshelf = require('bookshelf')(knexClient);


