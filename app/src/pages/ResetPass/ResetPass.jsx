import { React, useState } from "react";
import "./resetPass.css";
import logo from "../../images/Logo.png";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [match, setMatch] = useState(false);

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const resetPass = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setMatch(false);
    } else {
      setMessage("Password does not match");
      setMatch(true);
      return;
    }
    if (password.length < 5) {
      setMatch(true);
      setMessage("Password must be atleast 5 characters long");
      return;
    }
    setMessage("");
    await axios
      .post(`http://localhost:4000/api/users/resetPass/${token}`, {
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error(
          "Error resetting password:",
          err.response?.data?.message || err.message
        );
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

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pass"
              label="Password"
              name="pass"
              autoComplete="password"
              autoFocus
              value={password}
              onChange={handlePassChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPass"
              label="Confirm Password"
              name="confirmPass"
              autoComplete="confirmPassword"
              autoFocus
              value={confirmPassword}
              onChange={handleConfirmPassChange}
            />
            {match ? (
              <Typography variant="body1" sx={{ color: "red" }}>
                {message}
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
                onClick={resetPass}
              >
                Reset Password
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
