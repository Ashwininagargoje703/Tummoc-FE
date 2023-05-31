import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  document.title = "Register";

  const submitUser = (e) => {
    e.preventDefault();
    let user = { username, password };

    fetch(`${backendUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 201) {
          handleLogin(res?.user, res.token);
        }
        navigate("/login");
      })
      .catch((e) => {
        alert("incorrect details!, please enter correct details.");
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
      <Typography variant="h6">Register</Typography>
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Box>
  );
}
