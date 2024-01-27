import React from "react";
import "./banner.css";
import logo from "../../images/Logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function banner() {
  return (
    <div className="banner">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="goDown">
        <KeyboardArrowDownIcon fontSize="large" />
      </div>
    </div>
  );
}
