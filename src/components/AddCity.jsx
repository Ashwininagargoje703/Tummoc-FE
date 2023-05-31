import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";

export default function AddCity() {
  const [cityname, setCityName] = useState("");
  const { token, setUserCity } = useContext(AuthContext);

  const submitCity = async () => {
    let res = await fetch(`${backendUrl}/city/create-city`, {
      method: "POST",
      body: JSON.stringify({ city: cityname }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    setUserCity(data.city.name);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <TextField
        type="text"
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
        variant="outlined"
        size="small"
      />
      <Button variant="contained" onClick={submitCity}>
        Submit
      </Button>
    </Box>
  );
}
