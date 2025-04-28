const Order = require("../models/Order");
const {
  HTTP_STATUS,
  ERROR_CODES,
  MESSAGES
} = require('../constants');
const { sendSuccess, sendError } = require('../utils/response');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, phoneNumber, address, orderDetails } = req.body;

    if (!customerName || !phoneNumber || !address || !orderDetails) {
      return sendError(
        res,
        ERROR_CODES.MISSING_REQUIRED_FIELDS,
        MESSAGES.ERROR.REQUIRED_FIELDS
      );
    }

    const newOrder = await Order.create({
      customerName,
      phoneNumber,
      address,
      orderDetails
    });

    return sendSuccess(
      res,
      newOrder,
      MESSAGES.SUCCESS.ORDER_CREATED,
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    return sendError(
      res,
      ERROR_CODES.DATABASE_ERROR,
      MESSAGES.ERROR.SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER,
      err.message
    );
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = Object.values(ORDER_STATUS);

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: err.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderNumber: -1 });
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: err.message,
    });
  }
};
