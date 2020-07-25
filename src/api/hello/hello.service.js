function Service(options, logger) {
	async function getHello() {
		logger.info('execute getHello');
		const respObj = {
			message: 'Hello'
		};

		return Promise.resolve(respObj);
	}

	async function getWorld() {
		const respObj = {
			message: 'World'
		};

		return Promise.resolve(respObj);
	}

	return {
		getHello,
		getWorld
	};
}
module.exports = Service;
