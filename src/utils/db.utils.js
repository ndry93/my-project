const library = require('@src/library');

module.exports = config => {
	const db = library.db.dynamoDB(config);

	function transactionTable(params) {
		const dbParams = {
			...params,
			TableName: config.PAYMENT_DB_TRANSACTION
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	function masterGatewayTable(params) {
		const dbParams = {
			...params,
			TableName: config.MASTERGATEWAY_DB_NAME
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	function paymentTokenTable(params) {
		const dbParams = {
			...params,
			TableName: config.PAYMENT_DB_TOKEN
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	function masterListGatewayTable(params) {
		const dbParams = {
			...params,
			TableName: config.MASTER_LISTGATEWAY_DB_NAME
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	function masterListInsuranceTable(params) {
		const dbParams = {
			...params,
			TableName: config.MASTER_LISTINSURANCE_DB_NAME
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	function paymentRequestTable(params) {
		const dbParams = {
			...params,
			TableName: config.PAYMENT_DB_REQUEST
		};

		return {
			get: () => db.get(dbParams),
			insert: () => db.put(dbParams),
			scan: () => db.scan(dbParams),
			query: () => db.query(dbParams),
			delete: () => db.remove(dbParams),
			update: () => db.update(dbParams)
		};
	}

	return {
		transactionTable,
		masterGatewayTable,
		masterListGatewayTable,
		masterListInsuranceTable,
		paymentTokenTable,
		paymentRequestTable
	};
};
