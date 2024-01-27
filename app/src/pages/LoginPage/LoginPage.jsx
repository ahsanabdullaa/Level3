// LoginPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "../../images/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../../services/UserService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // Handle login logic here
    userService
      .login(email, password)
      .then((data) => {
        console.log(data);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data);
        setIsVerified(true);
      });
  };

  return (
    <div className="container">
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome to
          </Typography>
          <div className="logo">
            <img
              src={logo}
              alt=""
              srcset=""
              style={{
                width: "150px",
                height: "auto",
              }}
            />
          </div>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, background: "#6C1827" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              sx={{
                background: "#6C1827",
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: "red" }}
            >
              {isVerified ? message : ""}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{
                color: "red",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Link
                to="/forgetPassword"
                style={{
                  color: "#208afa",
                  textDecoration: "underline",
                  fontSize: "12px",
                }}
              >
                Forget Password
              </Link>
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="button"
                variant="outlined"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "black",
                  width: "200px",
                  color: "white",
                  border: "1px solid black",
                  "&:hover": {
                    border: "1px solid black",
                    // padding: "10px",
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <Typography
              style={{
                fontSize: "12px",
              }}
            >
              Don't have an account?
              <Link
                to="/signup"
                style={{
                  color: "#208afa",
                  textDecoration: "underline",
                  marginLeft: "5px",
                  fontSize: "12px",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
