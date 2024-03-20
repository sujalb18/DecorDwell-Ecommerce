import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Products = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`, {
        withCredentials: true,
      })
      .then((products) => setProducts(products.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          navigate("/register");
        }
      });
  }, []);
  const [grid, setgrid] = useState(true);
  const [gridBack, setGridBack] = useState(true);
  function grids() {
    setgrid(true);
    setGridBack(true);
  }

  function gridsclose() {
    setgrid(false);
    setGridBack(false);
  }
  return (
    <>
      <Navbar colortext="true" />
      <div className="w-[80%] m-auto mt-10">
        <Link to={"/"}>Home/</Link>
        <p className="mt-2 text-6xl font-bold tracking-wide"></p>
        <div className="lg:flex space-x-3 hidden">
          <i
            className="fa-solid fa-grip cursor-pointer text-lg"
            onClick={grids}
            style={gridBack ? { color: "yellow" } : { color: "black" }}
          ></i>
          <i
            className="fa-solid fa-grip-lines cursor-pointer text-lg"
            onClick={gridsclose}
            style={gridBack ? { color: "black" } : { color: "yellow" }}
          ></i>
        </div>
        {grid ? (
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 lg:gap-3">
            {products.map((product) => {
              return (
                <>
                  <div className="flex flex-col mt-10">
                    <div>
                      <img src={product.img} className="w-[24rem]" alt="" />
                    </div>
                    <div className="my-2">
                      <div>
                        <Link
                          to={"/products/" + product._id}
                          className="napn lg:text-[0.92rem] text-base font-semibold hover:text-yellow-400"
                        >
                          {product.name}
                        </Link>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm font-semibold text-slate-400">
                          ${product.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-400">
                          {product.review}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-2 lg:gap-10 my-10 hidden">
            {products.map((product) => {
              return (
                <>
                  <div className="flex space-x-3">
                    <div>
                      <img src={product.img} className="w-[50rem]" alt="" />
                    </div>
                    <div>
                      <div>
                        <Link to={"/products/" + product._id} className="text-black font-semibold hover:text-yellow-400">
                            {product.name}
                        </Link>
                        <p>${product.price}</p>
                        <p>{product.review}</p>
                        <p>{product.desc}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
