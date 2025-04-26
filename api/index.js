const { json } = require("body-parser");
const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
  { id: 2, name: "Trần Thị B", phone: "0987654321" },
  { id: 3, name: "Lê Văn C", phone: "0909090909" },
];

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/users", (req, res) => res.json(users));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
