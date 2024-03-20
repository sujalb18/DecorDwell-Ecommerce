import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Logout = () => {
  const auth = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        auth.logout();
        navigate("/", { replace: true });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
};

export default Logout;
