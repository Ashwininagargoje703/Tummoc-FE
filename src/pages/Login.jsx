import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, handleLogin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  document.title = "Login";

  useEffect(() => {
    if (user || token) {
      navigate("/");
    }
  }, [handleLogin]);

  const submitUser = (e) => {
    e.preventDefault();
    let user = { username, password };

    fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 404) {
          return alert("user not found!");
        } else if (res.status === 401) {
          return alert("incorrect details!");
        }
        handleLogin(res?.user, res?.token);
      })
      .catch((e) => {
        console.log(e);
        alert("something went wrong!");
      });

    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h6">Login</Typography>
      <form onSubmit={submitUser}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              type="text"
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
}
