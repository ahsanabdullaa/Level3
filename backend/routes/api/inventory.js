var express = require("express");
var router = express.Router();
var Inventory = require("../../models/inventory");

/* GET inventory listing. */
router.get("/", async function (req, res, next) {
  let inventory = await Inventory.findOne();
  res.send(inventory);
});

/* Create inventory. */
router.post("/add", async function (req, res, next) {
  try {
    let inventory = new Inventory();
    inventory.base = req.body.base;
    inventory.sauce = req.body.sauce;
    inventory.cheese = req.body.cheese;
    inventory.veggies = req.body.veggies;
    await inventory.save();
    res.send(inventory);
  } catch (error) {
    console.log(error);
  }
});

// update inventory
router.put("/update", async function (req, res, next) {
  const { base, sauce, cheese, veggies } = req.body;
  try {
    let inventory = await Inventory.findOne();

    if (!inventory) {
      inventory = new Inventory({ base, sauce, cheese, veggies });
      await inventory.save();
    } else {
      inventory.base += base;
      inventory.sauce += sauce;
      inventory.cheese += cheese;
      inventory.veggies += veggies;
      await inventory.save();
    }
    res.send(inventory);
  } catch (err) {
    console.log(err);
  }
});

// delete inventory
router.put("/delete", async function (req, res, next) {
  const count = req.body.count;
  try {
    let inventory = await Inventory.findOne();

    if (!inventory) {
      inventory = new Inventory({ base, sauce, cheese, veggies });
      await inventory.save();
    } else {
      inventory.base -= count;
      inventory.sauce -= count;
      inventory.cheese -= count;
      inventory.veggies -= count;

      await inventory.save();
    }
    res.send(inventory);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
