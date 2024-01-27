const express = require("express");
const router = express.Router();
const config = require("config");
const stripe = require("stripe")(config.get("STRIPE_SECRET_KEY"));

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Amount in cents
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: "http://localhost:3000/success", // Redirect after successful payment
    cancel_url: "http://localhost:3000/cancel", // Redirect after canceled payment
  });

  res.json({ id: session.id });
});

module.exports = router;
