const { config } = require('@src/config');

function Controller(Service) {
	async function getVersion(ctx) {
		const version = await Service.GetVersionFromFile();
		const data = {
			version,
			env: config.env
		}
		ctx.log.info(data);
		ctx.body = data;
	}

	return {
		getVersion
	};
}

module.exports = Controller;
