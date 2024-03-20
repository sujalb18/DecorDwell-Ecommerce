import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import ProductDetails from "./Components/Product_Details";
import Footer from "./Components/Footer";
import Categories from "./Components/CategoryProduct";
import Products from "./Components/Products";
import About from './Components/About'
import Cart from "./Components/Cart";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ContactUs from './Components/ContactUs'
import Logout from "./Components/Logout";
const App = () => {
  return (
    <>
    {/* Reducer for navbar toggling between login and logout */}
  
        <BrowserRouter>
          <Routes>
            {/* Routing Process */}
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/products/:id" element={<ProductDetails />}></Route>
            <Route path="/products/category/:category" element={<Categories />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<ContactUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </BrowserRouter>
        
    </>
  );
};

export default App;
