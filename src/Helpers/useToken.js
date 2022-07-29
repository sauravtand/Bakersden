import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useToken() {
  const naviagte = useNavigate();
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      return JSON.parse(tokenString);
    }
  };
  const [token, setToken] = useState(getToken());

  // console.log('TOKEN', token)
  const saveToken = (val) => {
    sessionStorage.setItem("token", JSON.stringify(val));
    setToken(JSON.stringify(val));
  };

  const removeToken = () => {
    sessionStorage.clear("token");
    naviagte("/login");
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
