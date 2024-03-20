import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
const Navbar = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthentication();
  }, []);

  
  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:5000/check-auth', {
        withCredentials: 'include'
      });
      if (response.data.authenticated) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <div
        className="w-[full] flex justify-between p-7 navbar"
        style={props.colortext ? { color: "black" } : { color: "white" }}
      >
        <div className="flex w-[30%] mx-10 justify-between items-center">
          <div className="flex space-x-3">
            <div>
            <img src={logo} width={30} alt="" />
            </div>
            <Link to={"/"}>
              <p className="text-xl font-extrabold tracking-widest napn mt-1">
                DecorDwell
              </p>
            </Link>
          </div>
          <div
            className="space-x-8 text-base hidden md:block hover:text-yellow-500"
            style={props.colortext ? { color: "grey" } : { color: "white" }}
          >
            {isAuthenticated ? <Link to={"/products"}>Store</Link> :  <Link to={"/login"}>Store</Link>}
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div
          className="w-[30%] flex items-center"
          style={props.colortext ? { color: "grey" } : { color: "white" }}
        >
          <div className="space-x-7 text-base">

          </div>
          <div className="search mx-7 hidden lg:flex w-80 border-2 bg-white text-black">
            <input
              type="text"
              className="p-2 w-72 searchinput border-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><i className="fa-solid fa-magnifying-glass"></i></button> 
          </div>
          <div
            className="space-x-6 flex items-center"
            style={props.colortext ? { color: "black" } : { color: "white" }}
          >
            <div>

            {isAuthenticated ? 
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>  
              : 
              <Link to="/login">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link> 
              }
              
            </div>
            <div className="">
              {isAuthenticated
                ?

                <Link to="/profile">
                  <i className="fa-solid fa-user"></i>
                </Link>
                :
                <Link to="/login">
                  <i className="fa-solid fa-user"></i>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
