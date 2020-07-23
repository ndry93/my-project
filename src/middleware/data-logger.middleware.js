module.exports = function dataLoggerMiddleware() {
	return async (ctx, next) => {
		ctx.log.info({ request: ctx.request.body || ctx.request.query });
		await next();
		ctx.log.info({ response: ctx.response.body });
	};
};
