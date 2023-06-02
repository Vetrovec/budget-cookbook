const path = require('path');

module.exports.UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

module.exports.SQLITE_DB = path.join(__dirname, process.env.SQLITE_DB);
