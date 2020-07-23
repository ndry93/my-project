const AWS = require('aws-sdk');

module.exports = config => {
	const s3 = new AWS.S3(config.s3);

	async function upload(params) {
		return s3
			.upload(params)
			.promise()
			.then(response => response)
			.catch(error => error);
	}

	return {
		upload
	};
};
