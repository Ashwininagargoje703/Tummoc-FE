import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../http";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { userCity } = useContext(AuthContext);
  const [cities, setCities] = useState([]);

  const fetchAllCities = async () => {
    let res = await fetch(`${backendUrl}/city/get-cities`);
    let data = await res.json();
    setCities(data.city);
  };

  useEffect(() => {
    fetchAllCities();
  }, [userCity]);
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>UserName</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.user_details.username}</TableCell>
              <TableCell>{item?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
