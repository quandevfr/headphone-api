const express = require("express");
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api", userRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
