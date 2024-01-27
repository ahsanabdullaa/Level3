var express = require("express");
var router = express.Router();
var { CustomPizza } = require("../../models/customPizza");
var auth = require("../../middlewares/auth");

/* GET custom pizzas listing. */
router.get("/", async function (req, res, next) {
  let customPizzas = await CustomPizza.find();
  res.send(customPizzas);
});

/* GET single custom pizza listing. */
router.get("/:id", async function (req, res, next) {
  try {
    let customPizza = await CustomPizza.findById(req.params.id);
    if (!customPizza)
      return res.status(404).send("Custom pizza with given ID not found");
    res.send(customPizza);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

/* Create custom pizza. */
router.post("/", auth, async function (req, res, next) {
  let customPizza = new CustomPizza();
  let user = req.user;
  customPizza.userId = user._id;
  customPizza.name = "Pizza" + Math.floor(Math.random() * 1000);
  customPizza.price = req.body.price;
  customPizza.base = req.body.base;
  customPizza.sauce = req.body.sauce;
  customPizza.cheese = req.body.cheese;
  customPizza.veggies = req.body.veggies;
  await customPizza.save();
  res.send(customPizza);
});

/* Update custom pizza. */
router.put("/:id", auth, async function (req, res, next) {
  let customPizza = await CustomPizza.findById(req.params.id);
  customPizza.price = 100;
  customPizza.base = req.body.base;
  customPizza.sauce = req.body.sauce;
  customPizza.cheese = req.body.cheese;
  customPizza.veggies = req.body.veggies;
  await customPizza.save();
  res.send(customPizza);
});

/* Delete custom pizza. */
router.delete("/:id", auth, async function (req, res, next) {
  let customPizza = await CustomPizza.findByIdAndDelete(req.params.id);
  res.send(customPizza);
});

// Add to cart
router.post("/cart/:id", async function (req, res, next) {
  let customPizza = await CustomPizza.findById(req.params.id);
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(customPizza);
  res.cookie("cart", cart);
  res.send(cart);
});

module.exports = router;
