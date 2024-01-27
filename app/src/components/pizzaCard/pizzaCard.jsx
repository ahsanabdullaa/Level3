import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import pizzaImage from "../../images/pizzaCard.jpg";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function PizzaCard(props) {
  const { pizza } = props;
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios
        .post(`http://localhost:4000/api/order/place`, pizza)
        .then((res) => {
          // console.log(res.data);
          // navigate("/order");
          setShowAlert(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const SimpleAlert = () => {
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Added to cart successfully!
      </Alert>
    );
  };

  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardMedia
        component="img"
        height="140"
        image={pizzaImage}
        alt="green iguana"
        sx={{ width: "100%", height: "auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {pizza.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${pizza.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Base: {pizza.base}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sauce: {pizza.sauce}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cheese: {pizza.cheese}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Veggies: {pizza.veggies}
        </Typography>
        {showAlert && <SimpleAlert />}

        <Button
          variant="contained"
          onClick={() => {
            console.log(pizza);
            handleSubmit();
          }}
        >
          Add To Cart <AddShoppingCartIcon fontSize="medium" />
        </Button>
      </CardContent>
    </Card>
  );
}
