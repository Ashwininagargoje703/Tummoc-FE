import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddCity from "./AddCity";

export default function Header() {
  const { user, setUser, setToken, userCity } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userCity");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "lightgray",
        marginBottom: "2rem",
      }}
    >
      <Box>
        {!user && (
          <Typography fontWeight={600}>Please Login / Register</Typography>
        )}
        {user && (userCity === "" || userCity === null) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography>Welcome {user.username}</Typography>
            <AddCity />
          </Box>
        )}
        {user && userCity !== null && userCity !== "" && (
          <Typography>
            Welcome <strong style={{ color: "blue" }}>{user.username}</strong>,
            your city is <strong style={{ color: "blue" }}>{userCity}</strong>
          </Typography>
        )}
      </Box>

      {!user && (
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
      {user && (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Box>
  );
}
