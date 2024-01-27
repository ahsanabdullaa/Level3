var express = require("express");
var router = express.Router();
var validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");
var auth = require("../../middlewares/auth");
var isAdmin = require("../../middlewares/isAdmin");

// GET all products.
router.get("/", auth, isAdmin, async function (req, res, next) {
  console.log(req.user);
  // Pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);

  let products = await Product.find().skip(skipRecords).limit(perPage);
  if (products.length === 0) return res.status(404).send("No products found");

  res.send(products);
});

// GET a single product.
router.get("/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product with given ID not found");
  res.send(product);
});

// UPDATE a product.
router.post("/add", validateProduct, async function (req, res, next) {
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  await product.save();
  res.send(product);
});

// DELETE a product.
router.delete("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Product with given ID not found");
  res.send(product);
});

// UPDATE a product.
router.put("/update/:id", validateProduct, async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product with given ID not found");
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.send(product);
});

// ADD to cart.
router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  console.log(cart);
  res.cookie("cart", cart);
  res.send(cart);
});

module.exports = router;
