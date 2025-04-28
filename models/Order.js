const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ["white", "black"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      default: 0,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    orderDetails: [orderItemSchema],
    totalQuantity: {
      type: Number,
      default: 0, // Thêm default value
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Sửa lại middleware pre-save để đảm bảo chạy trước
orderSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      // Tự động tăng orderNumber
      const lastOrder = await this.constructor.findOne(
        {},
        {},
        { sort: { orderNumber: -1 } }
      );
      this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
    }

    // Tính tổng quantity
    this.totalQuantity = this.orderDetails.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Order", orderSchema);
