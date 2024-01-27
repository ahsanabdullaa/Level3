var mongoose = require("mongoose");
const Joi = require("joi");

var pizzaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  base: String,
  sauce: String,
  cheese: String,
  veggies: String,
});

module.exports.Pizza = mongoose.model("Pizza", pizzaSchema);
