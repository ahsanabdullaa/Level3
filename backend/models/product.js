var mongoose = require("mongoose");
const Joi = require("joi");
var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

function validateProduct(product, { abortEarly = false } = {}) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);
module.exports.Product = Product;
module.exports.validate = validateProduct;
