const express = require("express");
const app = express();
const serverless = require("serverless-http");
const userRoutes = require("../routes/userRoutes");

app.use("/api", userRoutes);

module.exports.handler = serverless(app);
