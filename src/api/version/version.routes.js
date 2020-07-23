const path = require('path');

const swaggerTags = ['api'];

const apiName = path.basename(path.dirname(__filename));

function Routes(Controller) {
	const routes = [
		{
			method: 'GET',
			path: '/',
			tags: swaggerTags,
			handler: async ctx => {
				await Controller.getVersion(ctx);
			}
		}
	];

	return Router => {
		const router = Router();
		router.prefix(`/${apiName}`);
		router.route(routes);
		return router;
	};
}

module.exports = Routes;
