const express = require("express");
const transControl = require("../controllers/transControl");
const transRouter = express.Router();

transRouter
  .route("/")
  .get(transControl.getallTransaction)
  .post(transControl.createTransaction);

transRouter.route("/:transId").get(transControl.getTransaction);

module.exports = transRouter;
