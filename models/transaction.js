const mongoose = require("mongoose");
const transaction = mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customers",
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customers",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transactions", transaction);
