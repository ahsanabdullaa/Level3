const express = require("express");
const router = express.Router();
const { Order } = require("../../models/order");
const auth = require("../../middlewares/auth");

// GET orders listing
router.get("/", auth, async function (req, res, next) {
  try {
    let user = req.user;
    let orders = await Order.find({ userId: user._id });
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

// GET single order listing
router.get("/:id", async function (req, res, next) {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order with given ID not found");
    res.send(order);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// Create order
router.post("/place", auth, async function (req, res, next) {
  try {
    // let order = await Order.findById(req.params.id);
    // if (order) return res.status(400).send("Order already placed");
    let user = req.user;
    let order = new Order();
    order.userId = user._id;
    order.email = user.email;
    order.name = req.body.name;
    order.price = req.body.price;
    order.pizzaId = req.params.id;
    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

// Update order
router.put("/update/:id", async function (req, res, next) {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order with given ID not found");
    order.status = req.body.status;
    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

// Delete order
router.delete("/delete/:id", async function (req, res, next) {
  let order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Order with given ID not found");
  res.send(order);
});

// delete all orders
router.delete("/delete", auth, async function (req, res, next) {
  let user = req.user;
  let orders = await Order.deleteMany({ userId: user._id });
  res.send(orders);
});

module.exports = router;
