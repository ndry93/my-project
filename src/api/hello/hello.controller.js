function Controller(services, logger) {
	const { HelloService, VersionService } = services;
	async function getHelloWorld(ctx) {
		const hello = await HelloService.getHello();
		const world = await HelloService.getWorld();
		const data = `${hello.message} ${world.message}`;
		const currentVersion = await VersionService.GetVersionFromFile();
		logger.info(`current version:${currentVersion}`);

		logger.info(data);
		ctx.body = data;
	}

	return {
		getHelloWorld
	};
}

module.exports = Controller;
