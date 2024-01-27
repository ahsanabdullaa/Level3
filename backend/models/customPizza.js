var mongoose = require("mongoose");
const Joi = require("joi");

var customPizzaSchema = new mongoose.Schema({
  userId: String,
  name: String,
  price: Number,
  base: String,
  sauce: String,
  cheese: String,
  veggies: Array,
});

module.exports.CustomPizza = mongoose.model("CustomPizza", customPizzaSchema);

function validateCustomPizza(customPizza) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    base: Joi.string().required(),
    sauce: Joi.string().required(),
    cheese: Joi.string().required(),
    veggies: Joi.array().required(),
  });

  return schema.validate(customPizza);
}

module.exports.validate = validateCustomPizza;
