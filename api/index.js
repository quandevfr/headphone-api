const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/users`);
});

module.exports.handler = serverless(app);
