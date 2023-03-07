const express = require("express");
const Router = express.Router();

const { productController } = require("../controller");

Router.get("/suggested", productController.getSuggested);
Router.get("/", productController.getAllProduct);
Router.get("/totalPage", productController.totalPage);
Router.get("/category", productController.getCategory);
Router.get("/detail", productController.product_detail)
Router.get("/branch_product", productController.branch_product)
Router.get("/pageCategory" ,productController.totalPageCategory)
Router.get("/getallproduct",productController.getAllUnit)

module.exports = Router;
