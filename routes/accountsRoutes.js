const express = require("express");
const router = express.Router();
const {
  getAccounts,
  register,
  login,
  logout,
} = require("../controllers/accountController");

router.get("/accounts", getAccounts);
// router.post("/accounts/test", addTestAccounts); // Endpoint to add test data
router.post("/accounts/register", register);
router.post("/accounts/login", login);
router.post("/accounts/logout", logout);

module.exports = router;
