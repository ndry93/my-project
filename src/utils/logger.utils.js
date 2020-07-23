const { config } = require('@src/config');

const logger = require('pino')({
	level: config.env === 'production' ? 'error' : 'info',
	prettyPrint: { colorize: true, translateTime: true }
});

module.exports = {
	logger
};
