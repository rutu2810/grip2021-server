const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const port = process.env.PORT || 3500;
const app = express();
const dbUri =
  process.env.ENVIRONMENT == "DEV"
    ? process.env.MONGO_DEV_URI
    : process.env.MONGO_PROD_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(dbUri, options)
  .then(() => console.log("Database Connect"))
  .catch((error) => console.error("Not Connected to Database", error));

app.use(cors());

app.use(express.json());
app.use("/api/customers", require("./routes/cusRoutes"));
app.use("/api/transactions", require("./routes/transRoutes"));
app.listen(port, () => console.log(`Listening at ${port}`));
