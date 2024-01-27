import { React } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import logo from "../../images/Logo.png";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import axios from "axios";

export default function CartCard(props) {
  const { item } = props;
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:4000/api/order/delete/${item._id}`)
      .then((res) => {
        console.log(res.data);
        props.updateLoad();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card
      sx={{
        // maxWidth: 345,
        boxShadow: 3,
        width: "300px",
        // height: "100px",
        margin: "0.5rem",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          height="50"
          width="10"
          image={logo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Price:{item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "red",
          }}
          onClick={handleDelete}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
