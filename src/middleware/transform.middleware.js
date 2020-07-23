function transformer() {
	return async (ctx, next) => {
		try {
			await next();
			if (ctx.response.is('json') && ctx.status === 200) {
				ctx.body = {
					status: 'success',
					message: 'success',
					statusCode: 200,
					data: ctx.body
				};
			}
		} catch (error) {
			ctx.log.error(error);
			ctx.status = error.statusCode || 500;
			ctx.body = {
				status: 'error',
				statusCode: ctx.status,
				message: ctx.status === 500 ? 'internal server error' : error.message
			};
			ctx.app.emit(`error`, error, ctx);
		}
	};
}

module.exports = transformer;
