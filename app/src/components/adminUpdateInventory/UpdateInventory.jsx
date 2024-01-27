import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Container,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

const UpdateInventory = () => {
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "base") {
      setBase(value);
    } else if (name === "sauce") {
      setSauce(value);
    } else if (name === "cheese") {
      setCheese(value);
    } else if (name === "veggies") {
      setVeggies(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      base: parseInt(base),
      sauce: parseInt(sauce),
      cheese: parseInt(cheese),
      veggies: parseInt(veggies),
    };

    await axios
      .put("http://localhost:4000/api/inventory/update", formData)
      .then((res) => {
        console.log(res.data);
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SimpleAlert = () => {
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Inventory updated successfully!
      </Alert>
    );
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Update Inventory
      </Typography>
      <form
        style={{
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
          marginTop: "2rem",
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="base">Base Quantity</InputLabel>
          <Input
            id="base"
            name="base"
            type="number"
            value={base}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="sauce">Sauce Quantity</InputLabel>
          <Input
            id="sauce"
            name="sauce"
            type="number"
            value={sauce}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="cheese">Cheese Quantity</InputLabel>
          <Input
            id="cheese"
            name="cheese"
            type="number"
            value={cheese}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="veggies">Veggies Quantity</InputLabel>
          <Input
            id="veggies"
            name="veggies"
            type="number"
            value={veggies}
            onChange={handleChange}
          />
        </FormControl>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              padding: "0.5rem 2rem",
              borderRadius: "10px",
            }}
            onClick={handleSubmit}
          >
            Update
          </Button>
          {showAlert && <SimpleAlert />}
        </div>
      </form>
    </Container>
  );
};

export default UpdateInventory;
