function Controller(services, logger) {
	const { HelloService, VersionService } = services;
	console.log()
	async function getHelloWorld(ctx) {
		const hello = await HelloService.getHello();
		const world = await HelloService.getWorld();
		const currentVersion = await VersionService.GetVersionFromFile();

		const data = `${hello.message} ${world.message} ${currentVersion}`;
		logger.info(data);
		ctx.body = data;
	}

	return {
		getHelloWorld
	};
}

module.exports = Controller;
