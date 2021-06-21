const express = require("express");
const custControl = require("../controllers/custControl");
const customerRouter = express.Router();

customerRouter
  .route("/")
  .get(custControl.getallCustomer)
  .post(custControl.addCustomer);

customerRouter
  .route("/:custId")
  .get(custControl.getCustomer)
  .put(custControl.updateCustomer)
  .delete(custControl.deleteCustomer);

module.exports = customerRouter;
