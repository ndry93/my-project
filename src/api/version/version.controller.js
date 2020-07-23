const { config } = require('@src/config');

function Controller(services) {
	const { VersionService } = services;
	async function getVersion(ctx) {
		const version = await VersionService.GetVersionFromFile();
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
