const express = require("express");
const Router = express.Router();

const { adminController } = require("../controller");

Router.get("/sales-report", adminController.salesReport);
Router.post("/register", adminController.adminRegister);
Router.get("/branch-admin-available", adminController.getBranchAdmin);

module.exports = Router;
