import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const callProfilePage = async (e) => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer Token",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserData(data);
    } catch (err) {}
  };
  useEffect(() => {
    callProfilePage();
  }, []);
  return (
    <>
      <Navbar colortext="white" />
      <div className="profile mt-10 lg:w-[40%] w-full m-auto lg:bg-gray-100 border-2 p-10 space-y-5">
        <p>Name : {userData.name}</p>
        <p>Email : {userData.email}</p>
        <div>
        <Link
          to={"/logout"}
          type="button"
          className="focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900 "
        >
          Logout
        </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
