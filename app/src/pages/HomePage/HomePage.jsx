import { React } from "react";
import NavBar from "../../components/navbar";
import Banner from "../../components/banner/banner";
import PizzaImage from "../../images/pizza.avif";
import Footer from "../../components/footer/footer";
import PizzaCards from "../../components/pizzaCards";
import axios from "axios";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Banner />
      <div
        style={{
          margin: "2rem 1rem",
        }}
      >
        <PizzaCards />
      </div>
      <div>
        <img
          src={PizzaImage}
          alt=""
          style={{
            width: "80%",
            height: "auto",
            display: "block",
            margin: "auto",
          }}
        />
      </div>
      <div
        className="order"
        style={{
          textAlign: "center",
          margin: "auto",
          marginTop: "50px",
          marginBottom: "50px",
          width: "80%",
        }}
      >
        <div
          className="orderButton"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <button
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "#f50057",
              border: "none",
              borderRadius: "10px",
              padding: "1rem 2rem",
              cursor: "pointer",
            }}
          >
            Order Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
