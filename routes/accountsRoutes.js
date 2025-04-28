const express = require("express");
const router = express.Router();
const {
  getAccounts,
  register,
  login,
  logout,
} = require("../controllers/accountController");
const verifyToken = require("../middleware/auth");

router.get("/accounts", verifyToken, getAccounts);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
