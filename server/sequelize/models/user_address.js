"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user_address extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user }) {
			// define association here
			this.belongsTo(user, { foreignKey: "user_id" });
		}
	}
	user_address.init(
		{
			address: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have an address" },
					notEmpty: { msg: "Users address can not be empty" },
				},
			},
			receiver_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Receiver must have a receiver name" },
					notEmpty: { msg: "Receiver name can not be empty" },
				},
			},
			receiver_phone: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: { msg: "Receiver must have a phone number" },
					notEmpty: { msg: "Receiver phone_number can not be empty" },
				},
			},
			lat: DataTypes.STRING,
			lng: DataTypes.STRING,
			main_address: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "user_address",
			freezeTableName: true,
		}
	);
	return user_address;
};
