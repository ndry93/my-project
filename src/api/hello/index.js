const { config } = require('@src/config');
const { db } = require('@src/utils/db.utils')(config);
const { logger } = require('@src/utils/logger.utils');

// import VersionService
const { VersionService } = require('@src/api/version');

const HelloService = require('./hello.service')({ db }, logger);

const controller = require('./hello.controller')({ HelloService, VersionService }, logger);

module.exports = require('./hello.routes')(controller);
