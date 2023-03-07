const express = require("express");
const { cartController } = require("../controller");
const Router = express.Router();

Router.post("/add", cartController.addToCart);
Router.post("/get", cartController.getCart)
Router.post("/inc",cartController.incrementQuantity)
Router.post("/dec",cartController.decrementQuantity)

module.exports = Router;
