const { Sequelize, DataTypes, Op } = require('sequelize');
const models = require('@src/models');
const { logger } = require('@src/utils/logger.utils');

// cache object
const modelDict = {};
let sequelize;

module.exports = config => {
	if (!sequelize) {
		sequelize = new Sequelize(config.PG_DB_NAME, config.PG_USER_NAME, config.PG_PASSWORD, {
			host: config.PG_HOST_NAME,
			port: config.PG_PORT,
			dialect: 'postgres',
			pool: {
				max: 10,
				min: 0,
				idle: 10000
			},
			timestamps: false,
			logging: str => {
				logger.info(str);
			}
		});
	}

	if (Object.keys(modelDict).length === 0) {
		// model initiation
		Object.entries(models).forEach(([key, value]) => {
			modelDict[key] = value(sequelize, DataTypes);
		});

		// create model relation
		Object.keys(modelDict).forEach(tableName => {
			const model = modelDict[tableName];
			Object.keys(model.rawAttributes).forEach(columnName => {
				const column = model.rawAttributes[columnName];
				if (column.references) {
					const parentTableName = column.references.model;
					logger.info(
						`-m ${model.tableName} has reference on ${columnName} to ${parentTableName}.${column.references.key}`
					);

					const parentModel = modelDict[parentTableName];
					model.belongsTo(parentModel, {
						foreignKey: column.references.key
					});
					parentModel.hasMany(model, {
						foreignKey: columnName
					});
				}
			});
		});
	}

	return {
		sequelize,
		DataTypes,
		Op,
		models: modelDict
	};
};
