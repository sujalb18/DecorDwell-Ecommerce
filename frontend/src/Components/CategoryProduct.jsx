import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Footer from './Footer';

const Table = () => {
  const { category } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/products/category/${category}`)
      .then(products => setProducts(products.data))
      .catch(err => console.log(err))
  }, [category])
  const [grid, setgrid] = useState(true);
  const [gridBack, setGridBack] = useState(true)
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
      <div className='text-slate-500 napn'>
        <div className='w-[80%] m-auto mt-10'>
          <Link to={"/"}>Home/{products.category}</Link>
          <p className='mt-2 text-6xl font-bold tracking-wide'>{products.category}</p>
          <div className='flex space-x-3'>
            <i className="fa-solid fa-grip cursor-pointer text-lg" onClick={grids} style={gridBack ? { color: "yellow" } : { color: "black" }}></i>
            <i className="fa-solid fa-grip-lines cursor-pointer text-lg" onClick={gridsclose} style={gridBack ? { color: "black" } : { color: "yellow" }}></i>
          </div>
          {grid ?
            <div className='grid grid-cols-3 gap-3'>
              {products.map(product => {
                return (
                  <>
                    <div className='flex flex-col mt-10'>
                      <div>
                        <img src={product.img} className='w-[24rem]' alt="" />
                      </div>
                      <div className='my-2'>
                        <div>
                          <Link to={"/products/" + product._id} className='napn text-[0.92rem] font-semibold text-black hover:text-yellow-500'>{product.name}</Link>
                        </div>
                        <div className='mt-1'>
                          <p className='text-sm font-semibold text-slate-400'>${product.price}</p>
                        </div>
                        <div>
                          <p className='text-lg font-semibold text-slate-400'>{product.review}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            :
            <div className='grid grid-cols-2 gap-10 my-10'>
              {products.map(product => {
                return (
                  <>
                    <div className='flex space-x-3'>
                      <div>
                        <img src={product.img} className='w-[50rem]' alt="" />
                      </div>
                      <div>
                        <div>
                          <Link to={"/products/" + product._id}>
                            <p className='text-black font-semibold hover:text-yellow-500'>{product.name}</p>
                          </Link>
                          <p>${product.price}</p>
                          <p>{product.review}</p>
                          <p className='text-slate-500'>{product.desc}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Table