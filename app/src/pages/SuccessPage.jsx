import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import NavBar from "../components/navbar";

export default function SuccessPage() {
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <h1>Order Placed Successfully!!</h1>
        <CheckIcon
          fontSize="large"
          style={{
            color: "green",
            border: "2px solid green",
            borderRadius: "50%",
            padding: "20px",
          }}
        />
      </div>
    </div>
  );
}
