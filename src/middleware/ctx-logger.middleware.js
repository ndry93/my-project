/**
 * This middleware is to extend ctx.logger information
 */
module.exports = function ctxLoggerMiddleware(accessTokenName) {
	return async (ctx, next) => {
		// transform ctx
		ctx.log = ctx.log.child({
			endpoint: ctx.request.url,
			accessToken: ctx.request.header[accessTokenName]
		});
		await next();
	};
};
