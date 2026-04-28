const fs = require("fs").promises;

//const DB_FILE = "./db.json";

const path = require("path");

const DB_FILE = path.join(
 __dirname,
 "../db.json"
);

const getCustomers = async () => {
  const data = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(data).customers || [];
};

const saveCustomers = async (customers) => {
  await fs.writeFile(DB_FILE, JSON.stringify({ customers }, null, 2));
};

module.exports = {
  getCustomers,
  saveCustomers,
};
