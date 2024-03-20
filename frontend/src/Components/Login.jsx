import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const HandleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setLogin({ ...login, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      // MOST IMPORTANT STEP FOR COOKIES
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 201) {
      const userData = await res.json();
      auth.logins(userData);
      navigate("/");
    } else {
      window.alert("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="flex flex-col  creds">
        <p className="text-3xl napn mt-16 text-center text-white">Login</p>
        <div className="w-full max-w-screen-md mx-auto my-10">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-5">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" name="email"
                value={login.email} onChange={HandleChange} required />
            </div>
            <div className="mb-5">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
              <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" name="password" value={login.password} onChange={HandleChange} required />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="mt-5 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-centerdark:focus:ring-blue-800" onClick={postData}>Login</button>
              <Link className="mt-4 font-semibold text-base text-yellow-500 hover:text-yellow-800" to={"/register"}>Register?</Link>
            </div>
          </form>

          <p className="napn text-center text-white text-xs mt-5">
            &copy;2020 Sujal. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
