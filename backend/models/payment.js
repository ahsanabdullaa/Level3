var mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports.Payment = mongoose.model("Payment", paymentSchema);
