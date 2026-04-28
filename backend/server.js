const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

/* 404 */
app.use(notFound);

/* exception middleware */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
