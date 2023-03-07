"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ branch, discount_history, user }) {
			// define association here
			this.belongsTo(branch, { foreignKey: "branch_id" });
			this.belongsTo(discount_history, { foreignKey: "discount_history_id" });
			this.belongsTo(user, { foreignKey: "user_id" });
			// this.hasMany(transaction_history, { foreignKey: "transaction_id" });
		}
	}
	transaction.init(
		{
			qty: DataTypes.INTEGER,
			product_name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			user_address: DataTypes.TEXT,
			courier: DataTypes.STRING,
			status: {
				type: DataTypes.STRING,
				defaultValue: "Waiting Payment",
			},
			payment_proof: DataTypes.STRING,
			invoice_no: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "transaction",
			freezeTableName: true,
		}
	);
	return transaction;
};
