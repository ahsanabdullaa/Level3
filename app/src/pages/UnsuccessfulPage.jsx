import React from "react";
import CloseIcon from "@mui/icons-material/Close";
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
        <h1>Order Failed!!</h1>
        <CloseIcon
          fontSize="large"
          style={{
            color: "red",
            border: "2px solid red",
            borderRadius: "50%",
            padding: "20px",
          }}
        />
      </div>
    </div>
  );
}
