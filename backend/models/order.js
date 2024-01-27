var mongoose = require("mongoose");
const Joi = require("joi");

var orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  email: String,
  pizzaId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  status: {
    type: String,
    enum: ["received", "in the kitchen", "sent to delivery"],
    default: "received",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
