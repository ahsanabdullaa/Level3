import { React, useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./customOrderPage.css";
import NavBar from "../../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
const CustomOrderPage = () => {
  const navigate = useNavigate();
  const baseOptions = [
    "california",
    "new york",
    "chicago",
    "sicilian",
    "greek",
  ];
  const [base, setBase] = useState("");
  const sauceOptions = ["tomato", "bbq", "alfredo", "pesto", "garlic"];
  const [sauce, setSauce] = useState("");
  const cheeseOptions = ["mozzarella", "cheddar", "feta"];
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState(["onions", "mushrooms", "olives"]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [baseError, setBaseError] = useState(false);
  const [sauceError, setSauceError] = useState(false);
  const [cheeseError, setCheeseError] = useState(false);
  const [veggiesError, setVeggiesError] = useState(false);

  const handleBaseChange = (e) => {
    setBase(e.target.value);
    setBaseError(e.target.value === "");
  };

  const handleSauceChange = (e) => {
    setSauce(e.target.value);
    setSauceError(e.target.value === "");
  };

  const handleCheeseChange = (e) => {
    setCheese(e.target.value);
    setCheeseError(e.target.value === "");
  };

  const handleVeggiesChange = (event) => {
    setSelectedVeggies(event.target.value);
    setVeggiesError(event.target.value.length === 0);
  };

  const handleSubmit = async () => {
    if (
      base === "" ||
      sauce === "" ||
      cheese === "" ||
      selectedVeggies.length === 0
    ) {
      setBaseError(base === "");
      setSauceError(sauce === "");
      setCheeseError(cheese === "");
      setVeggiesError(selectedVeggies.length === 0);
      return; // Stop submission if any field is empty
    }

    const pizza = {
      base: base,
      sauce: sauce,
      cheese: cheese,
      veggies: selectedVeggies,
      price: Math.floor(Math.random() * 100) + 1,
    };
    console.log(pizza);
    await axios
      .post("http://localhost:4000/api/customPizza", pizza)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`http://localhost:4000/api/order/place`, res.data)
          .then((res) => {
            console.log(res.data);
            // navigate("/order");
            // setShowAlert(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SimpleAlert = () => {
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Added to cart successfully!
      </Alert>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="customOrder">
        <div>
          <h1>Customize Your Pizza</h1>
        </div>
        <form>
          <FormControl className="formControl" style={{ margin: "0.5rem" }}>
            <InputLabel className="inputLabel" style={{ color: "white" }}>
              Choose Base
            </InputLabel>
            <Select
              className="select"
              style={{ color: "white" }}
              onChange={handleBaseChange}
              error={baseError}
            >
              {baseOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="formControl" style={{ margin: "0.5rem" }}>
            <InputLabel className="inputLabel" style={{ color: "white" }}>
              Choose Sauce
            </InputLabel>
            <Select
              style={{ color: "white" }}
              onChange={handleSauceChange}
              error={sauceError}
            >
              {sauceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="formControl" style={{ margin: "0.5rem" }}>
            <InputLabel className="inputLabel" style={{ color: "white" }}>
              Select Cheese
            </InputLabel>
            <Select
              style={{ color: "white" }}
              onChange={handleCheeseChange}
              error={cheeseError}
            >
              {cheeseOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="formControl" style={{ margin: "0.5rem" }}>
            <InputLabel className="inputLabel" style={{ color: "white" }}>
              Select Multiple Veggies
            </InputLabel>
            <Select
              multiple
              value={selectedVeggies}
              onChange={handleVeggiesChange}
              error={veggiesError}
              style={{ color: "white" }}
            >
              {veggies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {showAlert ? <SimpleAlert /> : null}
        </form>
        <div
          className="orderButton"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
          onClick={handleSubmit}
        >
          <button
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1rem",
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "#f50000",
              border: "none",
              borderRadius: "10px",
              padding: "1rem 2rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Add to Cart
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderPage;
