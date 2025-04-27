const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/orders", orderController.createOrder);
router.put("/orders/:orderId/status", orderController.updateOrderStatus);
router.get("/orders", orderController.getOrders);

module.exports = router;
