const library = require('@src/library');

const db = library.http.axios;

module.exports.get = (url, params) => {
	return db.get(url, params, null);
};

// Default timeout is 10 minutes
module.exports.post = (url, params, config) => {
	const httpConfig = {
		timeout: 600000
	};
	return db.post(url, params, config || httpConfig);
};
