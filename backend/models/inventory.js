const mongoose = require("mongoose");

var inventorySchema = new mongoose.Schema({
  base: { type: Number, default: 0 }, // Initial quantity for pizza base
  sauce: { type: Number, default: 0 }, // Initial quantity for sauce
  cheese: { type: Number, default: 0 }, // Initial quantity for cheese
  veggies: { type: Number, default: 0 }, // Initial quantity for veggies
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
