var express = require("express");
var router = express.Router();
var { Payment } = require("../../models/payment");
var auth = require("../../middlewares/auth");

/* GET payment listing. */
router.get("/", async function (req, res, next) {
  let payment = await Payment.find();
  res.send(payment);
});

/* Create payment. */
router.post("/add", auth, async function (req, res, next) {
  try {
    let user = req.user;
    let payment = new Payment();
    payment.userId = req.user._id;
    payment.amount = req.body.amount;
    payment.email = user.email;
    payment.status = req.body.status;
    await payment.save();
    res.send(payment);
  } catch (error) {
    console.log(error);
  }
});

// get payment by user id
router.get("/user/:id", async function (req, res, next) {
  try {
    let payment = await Payment.find({ userId: req.user._id });
    if (!payment)
      return res.status(404).send("Payment with given ID not found");
    res.send(payment);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
