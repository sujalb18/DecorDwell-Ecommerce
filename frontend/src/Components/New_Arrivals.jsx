import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const New_Arrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/products/isNewArrival/true")
      .then((product) => setNewArrivals(product.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <div>
          <p className="text-sm font-semibold tracking-widest napn">
            NEW ARRIVALS
          </p>
        </div>
        <div className="mt-7">
          <p className="lg:text-4xl text-3xl font-semibold napn">Boost your productivity</p>
        </div>
        <div className="w-12 border-[1px] border-yellow-400 mt-8"></div>

        <div className="grid lg:grid-cols-3 lg:gap-3 grid-cols-2 gap-1  mt-12 space-x-2 p-3 lg:p-0">
          {newArrivals.map((product) => {
           const id = product._id; 
            return (
              <>
                <div className="flex flex-col">
                  <div>
                    <img src={product.img} className="w-[24rem]" alt="" />
                  </div>
                  <div className="mx-5 my-2">
                    <div>
                      <Link
                        to={"/products/" + id}
                        className="napn text-[0.92rem] font-semibold hover:text-yellow-500"
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
        <div className="my-24">
          <Link to={"/products"}>
            <button className="focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900">
              View all products &#8594;
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default New_Arrivals;
