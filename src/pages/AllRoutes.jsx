import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
