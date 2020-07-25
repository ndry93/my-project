const { logger } = require('@src/utils/logger.utils');
const VersionService = require('./version.service')({}, logger);
const controller = require('./version.controller')({ VersionService }, logger);

module.exports = require('./version.routes')(controller);

module.exports.VersionService = VersionService;
