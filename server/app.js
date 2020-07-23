const Koa = require('koa');
const helmet = require('koa-helmet');
const Sentry = require('@sentry/node');
// const morgan = require('koa-morgan');
const koaBodyParser = require('koa-bodyparser');
const koaPinoLogger = require('koa-pino-logger');

require('module-alias/register');

const { config } = require('@src/config');
const { logger } = require('@src/utils/logger.utils');

// init KoaJs
const app = new Koa();
app.context.config = config;

// init Sentry if Dsn configured
if (config.SENTRY_PROJECT_DSN) {
	Sentry.init({
		dsn: config.SENTRY_PROJECT_DSN,
		environment: config.env
	});
}

// middleware
const domainMiddleware = require('@src/middleware/domain.middleware');
const transformMiddleware = require('@src/middleware/transform.middleware');
const responseTimeMiddleware = require('@src/middleware/response-time.middleware');
const accessValidMiddleware = require('@src/middleware/access-valid.middleware');
const ctxLoggerMiddleware = require('@src/middleware/ctx-logger.middleware');
const dataLoggerMiddleware = require('@src/middleware/data-logger.middleware');

app.use(
	koaPinoLogger({ logger }),
	ctxLoggerMiddleware(config.ACCESS_TOKEN_NAME),
	async (ctx, next) => {
		ctx.log.info(config);
		await next();
	}
);
app.use(koaBodyParser());
app.use(helmet());
// app.use(morgan('combined'));
app.use(domainMiddleware());
app.use(transformMiddleware());
app.use(responseTimeMiddleware());
// app.use(accessValidMiddleware(config.ACCESS_TOKEN_NAME));
app.use(dataLoggerMiddleware());

// apply router
// TO-DO : build router in /src/api/
const applyRouter = require('@src/api');

applyRouter(app);

// onError listener
app.on('error', (error, ctx) => {
    if (config.env !== 'development') {
        Sentry.captureException(error);
    }
    ctx.log.error(error.message);
});

module.exports = app;

