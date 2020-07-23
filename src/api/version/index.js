// const { config } = require('@src/config');
// const { db } = require('@src/utils/db.utils')(config);
const { logger } = require('@src/utils/logger.utils');
const VersionService = require('./version.service')({
	// db
},
logger);
const controller = require('./version.controller')({
	VersionService
},
logger);

module.exports = require('./version.routes')(controller);
