import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PizzaCard from "./pizzaCard/pizzaCard";
import axios from "axios";

export default function PizzaCards() {
  const [pizza, setPizza] = useState([]);
  const getPizzas = async () => {
    await axios
      .get("http://localhost:4000/api/pizza")
      .then((res) => {
        console.log(res.data);
        setPizza(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPizzas();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        // rowSpacing={4}
        // columnSpacing={4}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {pizza.map((pizza) => {
          return (
            <Grid item xs={12} md={4}>
              <PizzaCard pizza={pizza} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
