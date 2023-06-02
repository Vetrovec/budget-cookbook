const sqlite3 = require('sqlite3').verbose();
const { SQLITE_DB } = require('./config');
const db = new sqlite3.Database(SQLITE_DB);
module.exports = db;
