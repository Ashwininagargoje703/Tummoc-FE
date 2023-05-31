import React, { createContext, useEffect, useState } from "react";
import { backendUrl } from "../../http";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userCity, setUserCity] = useState(
    localStorage.getItem("userCity") || null
  );

  const handleLogin = (user, gottoken) => {
    setUser(user);
    setToken(gottoken);
    localStorage.setItem("token", gottoken);
    localStorage.setItem("user", user);
  };

  const getUserCity = async () => {
    try {
      let res = await fetch(`${backendUrl}/city/get-cities-by-user`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      setUserCity(data.city[0].city_details.name);
      localStorage.setItem("userCity", data.city[0].city_details.name);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUserCity();
  }, [token]);

  const values = {
    user,
    setUser,
    handleLogin,
    token,
    setToken,
    userCity,
    setUserCity,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
