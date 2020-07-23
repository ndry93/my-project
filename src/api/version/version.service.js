const fs = require('fs');
const util = require('util');
const path = require('path');
const { ErrorHandler } = require('@src/utils/error.utils');

function Service() {
	async function GetVersionFromFile() {
		const file = path.join(path.dirname(require.main.filename), '/version.properties');
		const readFile = util.promisify(fs.readFile);

		try {
			const version = await readFile(file); // need to be in an async function
			return version.toString();
		} catch (error) {
			throw new ErrorHandler(400, 'version.properties not found');
		}
	}

	return {
		GetVersionFromFile
	};
}
module.exports = Service;
