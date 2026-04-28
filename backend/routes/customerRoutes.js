const express = require("express");

const router = express.Router();

const {
  getCustomers,
  createCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", getCustomers);

router.post("/", createCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
