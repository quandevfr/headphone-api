const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  console.log("[createOrder]");
  try {
    const { customerName, phoneNumber, address, orderDetails } = req.body;

    if (
      !customerName ||
      !phoneNumber ||
      !address ||
      !orderDetails ||
      !Array.isArray(orderDetails)
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or orderDetails is not an array",
      });
    }

    if (orderDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    for (const item of orderDetails) {
      if (!item.color || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Each order item must have color and quantity",
        });
      }

      if (!["white", "black"].includes(item.color)) {
        return res.status(400).json({
          success: false,
          message: "Invalid color. Must be 'white' or 'black'",
        });
      }

      if (item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be at least 1",
        });
      }
    }

    const newOrder = new Order({
      customerName,
      phoneNumber,
      address,
      orderDetails,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: err.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "shipping",
      "delivered",
      "cancelled",
    ];

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
