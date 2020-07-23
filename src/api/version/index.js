// const { config } = require('@src/config');
// const { db } = require('@src/utils/db.utils')(config);
const { logger } = require('@src/utils/logger.utils');
const versionService = require('./version.service')({
	// db
},
logger);
const controller = require('./version.controller')({
	versionService
},
logger);

module.exports = require('./version.routes')(controller);
