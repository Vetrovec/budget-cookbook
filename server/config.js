const path = require('path');

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

const SQLITE_DB = path.join(__dirname, process.env.SQLITE_DB);

module.exports = {
	UPLOAD_DIR,
	SQLITE_DB,
};
