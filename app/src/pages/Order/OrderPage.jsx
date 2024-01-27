import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar";
import CartCard from "../../components/CartCard/CartCard";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";

export default function Order() {
  const [cart, setCart] = useState([]);
  const [load, setLoad] = useState(0);

  // Initialize Stripe
  const stripePromise = loadStripe(
    "pk_test_51NPsqTC7hXSY8lje6UovPPTt9GC4uqKEeDPrB6GxU7sqMJ9gsN2GD3jN7fNFtwRPnDARtBb73kRh5WWmdndBECYn001XhyiHvP"
  );

  const getCart = () => {
    axios
      .get("http://localhost:4000/api/order")
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLoad = () => {
    setLoad(load + 1);
  };

  useEffect(() => {
    getCart();
  }, [load]);

  // Calculate total bill
  const totalBill = cart.reduce(
    (total, item) => parseFloat(total + item.price),
    0
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      // Make a request to your server to create a checkout session
      const response = await axios.post(
        "http://localhost:4000/api/stripe/create-checkout-session",
        {
          items: cart,
        }
      );

      // When the customer clicks the button, redirect them to Checkout
      await axios
        .delete(`http://localhost:4000/api/order/delete`)
        .then(() => {
          console.log("Cart emptied!");
          axios
            .put("http://localhost:4000/api/inventory/delete", {
              count: cart.length,
            })
            .then(() => {
              console.log("Inventory updated!");
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .post("http://localhost:4000/api/payment/add", {
              amount: totalBill,
              status: "success",
            })
            .then(() => {
              console.log("Payment added!");
            })
            .catch((err) => {
              console.log(err);
            });

          setCart([]);
        })
        .catch((err) => {
          console.log(err);
        });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        // If payment is successful, reset the cart
        // Iterate over each item in the cart and delete from the backend
        console.log("Payment successful!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>Cart</h1>
        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <h1>Your cart is empty!</h1>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1", marginRight: "20px" }}>
              {/* CartCards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {cart.map((item) => (
                  <CartCard key={item.id} item={item} updateLoad={updateLoad} />
                ))}
              </div>
            </div>

            <div style={{ flex: "1", minWidth: "200px" }}>
              {/* Total Bill Section */}
              <div style={{ textAlign: "center" }}>
                <h2>Total Bill</h2>
                <p>Total: ${totalBill.toFixed(2)}</p>
                <Button
                  style={{
                    padding: "10px",
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
