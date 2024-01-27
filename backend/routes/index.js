var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  console.log(req.cookies.cart);
  res.send(cart);
});
module.exports = router;
