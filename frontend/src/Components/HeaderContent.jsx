import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const HeaderContent = () => {
  return (
    <>
      <div className="containers">
        <Navbar />
        <div className="flex flex-col text-white lg:p-32 lg:px-44 px-5 py-16 tracking-wider headercontent">
          <div className="font-semibold lg:text-base text-sm mb-5">
            <p>HOME OFFICE FURNITURE</p>
          </div>
          <div className="lg:text-7xl text-xl w-[80%] font-bold mt-7">
            <p>Stay productive and get more work done!</p>
          </div>
          <div className="mt-10">
            <Link to={'/products'}>
              <button type="button" className="focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900 ">
                Shop Collections &#8594;</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
