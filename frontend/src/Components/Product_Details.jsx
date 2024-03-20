import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import AddToCart from "./AddToCart";
import AllReviews from "./AllReviews";
import Footer from "./Footer";
import New_Arrivals from "./New_Arrivals";

const Product_Details = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ id, rating: 1 });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((products) => setProducts(products.data))
      .catch((err) => console.log(err));
  }, [id]);

  const [click, setClick] = useState(true);
  const [border, setBorder] = useState(true);
  function clickedReview() {
    setClick(false);
    setBorder(false);
  }
  function clickedDesc() {
    setClick(true);
    setBorder(true);
  }

  const SubmitReview = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/get-user-info', {
        withCredentials: true,
      });

      const user_id = userResponse.data._id;
      const { title, rating, comment } = newReview;

      const response = await axios.post(
        'http://localhost:5000/reviews',
        {
          user: user_id,
          product: id,
          title,
          rating,
          comment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: 'include',
        }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ rating: 0, comment: '' });
      if (response.status === 201) {
        window.alert('Review Added Successfully')
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbar colortext="true" />
      <div className="flex mt-12">
        <div className="flex lg:w-[70%] w-[100%] lg:flex-row flex-col m-auto lg:space-x-36">
          <div className="productimg">
            <img src={products.img} className="lg:w-[28rem] w-[90%] m-auto lg:m-0" alt="" />
          </div>
          <div className="flex flex-col lg:w-[45%] w-[90%] m-auto lg:m-0">
            <p className="text-gray-500 text-base">{products.category}</p>
            <p className="text-2xl font-semibold napn mt-4">{products.name}</p>
            <p className="text-2xl font-bold text-gray-500 mt-2">
              ${products.price}{" "}
              <span className="text-base font-medium text-gray-500">
                {" "}
                & Free Shipping{" "}
              </span>
            </p>
            <p className="text-gray-500 font-medium text-md">{products.desc}</p>
            <div>
              <div className="mt-7">
                <AddToCart />
              </div>
            </div>
            <div className="w-[100%] border border-1 mt-3 "></div>
            <div>
              <p className="text-gray-500 lg:text-base text-sm mt-2">
                Category: {products.category}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="desc&review">
        <div className="lg:w-[70%] w-[90%] m-auto">
          <div className="w-[100%] border border-1 mt-16"></div>
          <div className="flex space-x-6 font-semibold text-slate-600 cursor-pointer">
            <p
              onClick={clickedDesc}
              style={
                border ? { borderTop: "2px solid black" } : { borderTop: "0" }
              }
            >
              Description
            </p>
            <p
              onClick={clickedReview}
              style={
                border ? { borderTop: "0" } : { borderTop: "2px solid black" }
              }
            >
              Reviews
            </p>
          </div>
          {click ? (
            <div className="mt-5 text-slate-500">
              <p>{products.bigDesc}</p>
            </div>
          ) : (
            <div className="mt-10">
              <div className="border border-1 p-5 text-slate-600">

                <form className="max-w-sm mx-auto">
                  <div className="mb-5">
                    <label for="stars" className="block mb-2 text-sm font-medium">Your Rating</label>
                    <input type="number" min={1} max={5} id="stars" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500  dark:shadow-sm-light" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} required />
                  </div>

                  <div className="mb-5">
                    <label for="title" className="block mb-2 text-sm font-medium">Title your review</label>
                    <input type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })} required placeholder="What's most important to know?" />
                  </div>

                  <div className="mb-5">
                    <label for="message" className="block mb-2 text-sm font-medium">Write your review</label>
                    <textarea id="message" placeholder="What did you like or dislike? What did you use this porduct for?" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}  ></textarea>
                  </div>

                  <div className="mt-10">
                    <button
                      type="button"
                      className="focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900 w-full"
                      onClick={SubmitReview}
                    >
                      Submit
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}
          <AllReviews productId={id}  reviews={reviews}/>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Product_Details;
