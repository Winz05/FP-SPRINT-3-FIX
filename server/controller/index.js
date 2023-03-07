const productController = require("./productController");
const userController = require("./userController");
const adminController = require('./adminController')
const cartController = require('./cartController')

module.exports = {
	// export all controller here
	productController,
	userController,
	adminController,
	cartController
};
