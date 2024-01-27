// LoginPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./signup.css";
import logo from "../../images/Logo.png";
import axios from "axios";
import userService from "../../services/UserService";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [signup, setSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    if (name === "" || name.length < 3) {
      setNameError(true);
      return;
    }
    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    // Handle login logic here
    userService
      .register(name, email, password)
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setSignup(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    await axios
      .post("http://localhost:4000/api/users/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setSignup(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {signup ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20vh",
          }}
        >
          <h1>{message}</h1>
        </div>
      ) : (
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
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={handleNameChange}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ color: "red" }}
                >
                  {nameError
                    ? "Name is required and must be three characters long"
                    : ""}
                </Typography>

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
                  {emailError ? "Email is required" : ""}
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
                  style={{ color: "red" }}
                >
                  {passwordError
                    ? "Password is required and must me 5 characters long"
                    : ""}
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
                    onClick={handleSignup}
                  >
                    Sign up
                  </Button>
                </div>
                <Typography>
                  Don't have an account?
                  <Link
                    to="/login"
                    style={{
                      color: "#208afa",
                      textDecoration: "underline",
                      marginLeft: "5px",
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
