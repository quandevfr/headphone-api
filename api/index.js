const express = require("express");
const app = express();
const accountsRoutes = require("../routes/accountsRoutes");
const orderRoutes = require("../routes/orderRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

console.log("MongoDB URI:", process.env.MONGO_URI);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api", accountsRoutes);
app.use("/api", orderRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
