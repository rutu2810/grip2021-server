const customer = require("../models/customer");

exports.addCustomer = async (req, res) => {
  const { name, email, balance } = req.body;
  const data = {
    name,
    email,
    balance,
  };
  try {
    const cust = await customer.find({ email: email });
    if (cust.length > 0) {
      res.status(403).send("User with this email address already exists");
    } else {
      const new_cust = await customer.create(data);
      res.status(200).json(new_cust);
    }
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
exports.getallCustomer = async (req, res) => {
  try {
    const customers = await customer.find({});
    res.status(200).json(customers);
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
exports.getCustomer = async (req, res) => {
  const custId = req.params.custId;
  try {
    const cust = await customer.findById(custId);
    res.status(200).json(cust);
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
exports.deleteCustomer = async (req, res) => {
  const custId = req.params.custId;
  try {
    await customer.findByIdAndRemove(custId);
    res.status(200).json({ Success: true });
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
exports.updateCustomer = async (req, res) => {
  const custId = req.params.custId;
  try {
    const cust = await customer.findByIdAndUpdate(custId, req.body, {
      new: true,
    });
    res.status(200).json(cust);
  } catch (e) {
    res.status(500).send("Database Error");
  }
};
