var express = require("express");
var router = express.Router();

var { Pizza } = require("../../models/pizza");

/* GET pizzas listing. */
router.get("/", async function (req, res, next) {
  let pizzas = await Pizza.find();
  res.send(pizzas);
});

/* GET single pizza listing. */
router.get("/:id", async function (req, res, next) {
  try {
    let pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).send("Pizza with given ID not found");
    res.send(pizza);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

/* Create pizza. */
router.post("/", async function (req, res, next) {
  let pizza = new Pizza();
  pizza.name = req.body.name;
  pizza.price = req.body.price;
  pizza.base = req.body.base;
  pizza.sauce = req.body.sauce;
  pizza.cheese = req.body.cheese;
  pizza.veggies = req.body.veggies;
  await pizza.save();
  res.send(pizza);
});

/* Update pizza. */
router.put("/:id", async function (req, res, next) {
  let pizza = await Pizza.findById(req.params.id);
  pizza.name = req.body.name;
  pizza.price = req.body.price;
  pizza.base = req.body.base;
  pizza.sauce = req.body.sauce;
  pizza.cheese = req.body.cheese;
  pizza.veggies = req.body.veggies;
  await pizza.save();
  res.send(pizza);
});

/* Delete pizza. */
router.delete("/:id", async function (req, res, next) {
  let pizza = await Pizza.findByIdAndDelete(req.params.id);
  res.send(pizza);
});

// Add to cart
router.post("/cart/:id", async function (req, res, next) {
  try {
    let pizza = await Pizza.findById(req.params.id);
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    cart.push(pizza);
    res.cookie("cart", cart, {
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
    });
    console.log(req.cookies.cart);
    res.send(cart);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
  // let pizza = await Pizza.findById(req.params.id);
  // let cart = req.cookies.cart;
  // if (!cart) cart = [];
  // cart.push(pizza);
  // res.cookie("cart", cart, {
  //   maxAge: 3600000,
  //   expires: new Date(Date.now() + 3600000),
  // });
  // console.log(cart);
  // res.send(cart);
});

module.exports = router;
