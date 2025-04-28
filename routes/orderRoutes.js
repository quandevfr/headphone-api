const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getOrders,
} = require("../controllers/orderController");

router.post("/orders", createOrder);
router.put("/orders/:orderId/status", updateOrderStatus);
router.get("/orders", getOrders);

module.exports = router;
