const crypto = require("crypto");
const { getCustomers, saveCustomers } = require("../utils/db");

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (err) {
    next(err);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const customers = await getCustomers();

    const newCustomer = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };

    customers.push(newCustomer);

    await saveCustomers(customers);

    res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    let customers = await getCustomers();

    const customerFound = customers.find((c) => c.id === id);

    if (!customerFound) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    customers = customers.filter((c) => c.id !== id);

    await saveCustomers(customers);

    res.status(200).json({
      success: true,
      message: "Customer deleted",
    });
  } catch (err) {
    next(err);
  }
};
