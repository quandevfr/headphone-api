const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/users`);
});
