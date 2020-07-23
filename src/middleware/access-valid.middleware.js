const { ErrorHandler } = require('@src/utils/error.utils');

module.exports = function ctxValidMiddleware(accessTokenName, idp) {
	return async (ctx, next) => {
		let accessToken = ctx.request.header[accessTokenName];
		if (!accessToken && ctx.request.url.includes('/hook'))
			accessToken = ctx.request.query[accessTokenName];

		if (!accessToken && !ctx.request.url.includes('/version')) {
			throw new ErrorHandler(401, 'unauthorized access');
		} else {
			// await idp
			// 	.auth()
			// 	.verifyIdToken(accessToken)
			// 	.then(decodedToken => {
			// 		// success
			// 		ctx.log.info(`Token ${token} is valid`);
			// 		ctx.log.info(decodedToken);
			// 	})
			// 	.catch(error => {
			// 		ctx.log.error(error);
			// 		throw new ErrorHandler(401, 'unauthorized access');
			// 	});
		}

		await next();
	};
};
