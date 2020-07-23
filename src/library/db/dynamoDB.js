const AWS = require('aws-sdk');
const { ErrorHandler } = require('@src/utils/error.utils');
// const { logHandler } = require('@helper/logger');

// AWS.config.logger = ;

// sample exception from DynamoDB
// { ResourceNotFoundException: Requested resource not found
//     message: 'Requested resource not found',
//     code: 'ResourceNotFoundException',
//     time: 2020-06-11T07:31:50.797Z,
//     requestId: '6NDIBRFJ30SH1JKRPV9R5NFECRVV4KQNSO5AEMVJF66Q9ASUAAJG',
//     statusCode: 400,
//     retryable: false,
//     retryDelay: 43.59627439708228 }

/**
 * This operations throw exception onError,
 * So, for soft handling, you should add try/catch block when calling these functions
 */

module.exports = config => {
	const docClient = new AWS.DynamoDB.DocumentClient({
		region: config.DYNAMODB_REGION,
		convertEmptyValues: true
		// logger: logHandler
	});

	async function put(params) {
		return docClient
			.put(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	function update(params) {
		return docClient
			.update(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	function query(params) {
		return docClient
			.query(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	function scan(params) {
		return docClient
			.scan(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	function get(params) {
		return docClient
			.get(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	function remove(params) {
		return docClient
			.delete(params)
			.promise()
			.then(response => response)
			.catch(error => {
				if (error.code === 'ResourceNotFoundException') {
					throw new ErrorHandler(400, `${error.code} ${error.message}`);
				} else {
					throw new ErrorHandler(500, `${error.code} ${error.message}`);
				}
			});
	}

	return {
		put,
		update,
		query,
		scan,
		get,
		remove
	};
};
