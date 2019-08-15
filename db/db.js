const { Pool } = require('pg');
require('dotenv').config();

const {DB_USERNAME, DB_HOSTNAME, DB_DATABASE, DB_PASSWORD, DB_PORT} = process.env;

const connection = new Pool({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
})

module.exports = connection;