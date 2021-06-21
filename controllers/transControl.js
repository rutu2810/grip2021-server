const transaction = require("../models/transaction");
const customer = require("../models/customer");

exports.getallTransaction = async (req, res) => {
  try {
    const transactions = await transaction.find({}).populate("from to");
    res.status(200).json(transactions);
  } catch (e) {
    res.status(500).send("Database Error");
  }
};

exports.createTransaction = async (req, res) => {
  const { fromId, toId, amount } = req.body;
  if (!fromId || !toId || !amount) {
    res.status(403).send("Insufficient data");
  }
  try {
    const from = await customer.findById(fromId);
    const to = await customer.findById(toId);
    if (!from || !to) {
      res.status(404).send("Customer not found");
    }
    if (from.balance >= amount) {
      await customer.findByIdAndUpdate(fromId, {
        balance: from.balance - +amount,
      });
      await customer.findByIdAndUpdate(toId, {
        balance: to.balance + +amount,
      });
      const trans = await transaction.create({
        from: fromId,
        to: toId,
        amount,
      });
      // .populate("from to")

      res.status(200).json(trans);
    } else {
      res.status(403).send("Insufficient Balance");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.getTransaction = async (req, res) => {
  const transId = req.params.transId;
  try {
    const trans = await transaction.findById(transId).populate("from to");
    res.status(200).json(trans);
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
