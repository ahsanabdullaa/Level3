import { React, useState } from "react";
import "./forgetPass.css";
import logo from "../../images/Logo.png";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";

import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const emailVerification = async () => {
    if (email === "") {
      setEmpty(true);
      return;
    }
    setEmpty(false);

    await axios
      .post("http://localhost:4000/api/users/forgetPass", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setEmailError(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div
      style={{
        background: "#6C1827",
        height: "100vh",
      }}
    >
      {" "}
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img
              src={logo}
              alt=""
              srcset=""
              style={{
                width: "200px",
                height: "auto",
              }}
            />
          </div>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#fff",
            }}
          >
            Forget Password
          </Typography>

          {emailError ? (
            <Box
              component="form"
              sx={{ mt: 1, background: "#6C127", color: "#fff" }}
            >
              <Typography variant="body1">
                {message}
                <VerifiedIcon sx={{ color: "green" }} />
              </Typography>
            </Box>
          ) : (
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                  to="/login"
                  style={{
                    color: "#fff",
                    textDecoration: "underline",
                    fontSize: "12px",
                  }}
                >
                  <CloseIcon fontSize="large" />
                </Link>
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
              />
              {empty ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ color: "red" }}
                >
                  Email is required
                </Typography>
              ) : (
                ""
              )}

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
                  onClick={emailVerification}
                >
                  Verify Email
                </Button>
              </div>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}
