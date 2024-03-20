import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';


const Cart = () => {
    const [cart, setCart] = useState(null);
    var total = 0;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cart', {
                    headers: { Authorization: "Bearer Token" },
                    withCredentials: 'include'
                });

                setCart(response.data.cart);
            } catch (error) {
                console.error('Error fetching cart details:', error.response.data.message);
            }
        };

        fetchCartDetails();
    }, []);

    const modifyQuantityHandler = async (id, action) => {
        try {
            await axios.post(`http://localhost:5000/modifycart`, { id, action },
                { headers: { Authorization: "Bearer Token" }, withCredentials: 'include' }
            );

            // Refresh cart details after modification
            const response = await axios.get('http://localhost:5000/cart', {
                headers: { Authorization: "Bearer Token" }, withCredentials: 'include',
            });

            setCart(response.data.cart);
        } catch (error) {
            console.error('Error modifying quantity:', error.response.data.message);
        }
    };

    const removeFromCartHandler = async (id) => {
        console.log(id);
        try {
            await axios.post(`http://localhost:5000/deletecart`, { id },
                { headers: { Authorization: "Bearer Token" }, withCredentials: 'include' }
            );

            // Refresh cart details after removal
            const response = await axios.get('http://localhost:5000/cart', {
                headers: { Authorization: "Bearer Token" }, withCredentials: 'include',
            });

            setCart(response.data.cart);
        } catch (error) {
            console.error('Error removing item from cart:', error.response.data.message);
        }

    }

    if (!cart || cart.items.length === 0) {
        return (
            <>
                <Navbar colortext='true' />
                <div className='mt-10 w-[80%] m-auto'>
                    <p className='text-2xl font-semibold'>Your Cart is Empty</p>
                    <button className='mt-6 focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900'>
                        <Link to={'/products'}>
                            Click to Buy Products
                        </Link>
                    </button>
                </div>
                <Footer />
            </>
        )

    }
    return (
        <>
            <Navbar colortext='true' />
            <div className='lg:w-[70%] w-[90%] m-auto napn mt-20'>
                <h1 className='font-bold text-3xl'>Cart</h1>
                <div className='lg:border-t-2 lg:border-x-2 w-[100%] mt-10'>
                    <table className="lg:table-auto w-[100%] hidden lg:table">
                        <thead className='border-b-2'>
                            <tr className='bg-[#f8f8f8] text-[#8b8698]'>
                                <th className='lg:w-[5%]'></th>
                                <th className='lg:w-[10%]'></th>
                                <th className='lg:w-[10%] text-start py-3 font-normal'>Product</th>
                                <th className='lg:w-[5%] text-start font-normal'>Price</th>
                                <th className='lg:w-[5%] text-start font-normal'>Quantity</th>
                                <th className='lg:w-[5%] text-start font-normal'>Subtotal</th>
                            </tr>
                        </thead>
                        {cart.items.map((item) => (<>
                            <tbody>
                                <tr className='text-[#9a96a6] border-b-2'>


                                    <td><i className="fa-solid fa-xmark mx-5 cursor-pointer border-2 hover:border-black rounded-full p-1 text-slate-300 hover:text-black" onClick={() => removeFromCartHandler(item.product._id)}></i></td>


                                    <td><img src={item.product.img} className='my-4' width={80} alt="" /></td>


                                    <td>
                                        <Link to={'/products/' + item.product._id} className='hover:text-yellow-400'>
                                            {item.product.name}
                                        </Link>
                                    </td>


                                    <td>${item.product.price}</td>
                                    <p className='hidden'>{total += parseFloat((item.product.price * item.quantity).toPrecision(5))}</p>


                                    <td>
                                        <div className='flex border-2 w-fit'>
                                            <button className='border-r-2 px-4' onClick={() => modifyQuantityHandler(item.product._id, 'decrease')}>-</button>
                                            <p className='px-4 py-1'>{item.quantity}</p>
                                            <button className='border-l-2 px-4' onClick={() => modifyQuantityHandler(item.product._id, 'increase')}>+</button>
                                        </div>
                                    </td>
                                    <td>${parseFloat((item.product.price * item.quantity).toPrecision(5))}</td>

                                </tr>


                            </tbody>
                        </>))}
                    </table>
                    <div className='text-[#8b8698] lg:hidden'>
                        {cart.items.map((item) => (<>
                            <div className='border-2 border-b-0 p-2'>
                                <i className="fa-solid fa-xmark mx-5 cursor-pointer border-2 hover:border-black rounded-full p-1 text-slate-300 hover:text-black" onClick={() => removeFromCartHandler(item.product._id)}></i>
                            </div>
                            <div className='border-2 border-b-0 p-2'>
                                <img src={item.product.img} className='m-auto' width={70} alt="" />
                            </div>
                            <div className='border-2 border-b-0 p-3 flex justify-between'>
                                <p className='text-sm font-semibold'>Product:</p>
                                <Link to={'/products/' + item.product._id} className='hover:text-yellow-400 text-sm'>{item.product.name}</Link>
                            </div>
                            <div className='border-2 border-b-0 p-3 flex justify-between'>
                                <p className='text-sm font-semibold'>Price:</p>
                                <p>${item.product.price}</p>
                                <p className='hidden'>{total += parseFloat((item.product.price * item.quantity).toPrecision(5))}</p>
                            </div>
                            <div className='border-2 border-b-0 p-3 flex justify-between'>
                                <p className='text-sm font-semibold'>Quantity:</p>
                                <div className='flex border-2 w-fit'>
                                    <button className='border-r-2 px-4' onClick={() => modifyQuantityHandler(item.product._id, 'decrease')}>-</button>
                                    <p className='px-4 py-1'>{item.quantity}</p>
                                    <button className='border-l-2 px-4' onClick={() => modifyQuantityHandler(item.product._id, 'increase')}>+</button>
                                </div>
                            </div>
                            <div className='border-2  p-3 flex justify-between mb-10'>
                                <p className='text-sm font-semibold'>Subtotal:</p>
                                <p>${parseFloat((item.product.price * item.quantity).toPrecision(5))}</p>
                            </div>
                        </>))}
                    </div>
                </div>
                <div className='w-[100%] flex lg:justify-end'>
                    <div className='lg:w-[45%] w-full mt-10 border-2 text-[#8b8698]'>
                        <div className='w-[100%] p-2 border-b-2 bg-[#f8f8f8]'>
                            <p className='font-bold text-xl p-2 text-black napn'>Cart totals</p>
                        </div>

                        <div className='flex px-10 py-3 mt-10 space-x-10 border-b-2'>
                            <div>
                                <p>Subtotal</p>
                            </div>
                            <div>
                                <p>${parseFloat(total.toPrecision(5))/2}</p>
                            </div>
                        </div>
                        <div className='flex px-10 py-3 space-x-16 border-b-2'>
                            <div>
                                <p>Total</p>
                            </div>
                            <div>
                                <p>${parseFloat(total.toPrecision(5))/2}</p>
                            </div>
                        </div>

                        <div className='px-5 mt-5'>
                            <p>Have a coupon?</p>
                        </div>
                        <div className='px-5'>
                            <button className='w-[100%] mt-4 text-black bg-[#fbd84b] hover:bg-yellow-500  font-semibold rounded-md text-sm px-10 py-3 mb-10'><Link to={'/products'}> Proceed to Checkout </Link></button>
                        </div>
                    </div>
                </div>
            </div>

           <Footer />                     
        </>
    );
}

export default Cart