import React from "react";
import HeaderContent from "./HeaderContent";
import Semi_Ad from "./Semi_Ad";
import Categories from "./Categories";
import New_Arrivals from "./New_Arrivals";
import Features from "./Features";
import Featured_Collection from "./Featured_Collection";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <HeaderContent />
      <Semi_Ad />
      <Categories />
      <New_Arrivals />
      <Features />
      <Featured_Collection />
      <Footer />
    </>
  );
};

export default Home;
