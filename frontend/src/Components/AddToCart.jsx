import React, { useState } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";

import axios from "axios";
const AddToCart = () => {
    var [quantity, setquantity] = useState(1);
    function DecreaseQuantity(){
        if(quantity > 1){
            setquantity(quantity - 1)
        }else if(quantity < 1){
            setquantity(1)
        }
    }

    function IncreaseQuantity(){
        setquantity(quantity + 1);
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const HandleClick = async () => {
        const res = await axios.post('http://localhost:5000/addtocart', { id, quantity },
            {
                method: "POST",
                withCredentials: "include",
            }
        );
        if (res.status === 200) {
            navigate('/cart')
        } else {
            window.alert('Error Adding Cart')
        }
    }
    return (
        <>
            <div className="flex space-x-10 mt-5">
                <div className=' flex'>
                    <div className="flex border-2 w-fit">
                    <button className='border-r-2 px-4' onClick={DecreaseQuantity}>-</button>
                    <p className='px-4 py-1'>{quantity}</p>
                    <button className='border-l-2 px-4' onClick={IncreaseQuantity}>+</button>
                    </div>
                </div>
                <div className="w-fit mt-1">
                    <Link className=" focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-sm text-sm px-3 py-2 me-2 mt-10 mb-2 dark:focus:ring-yellow-900" onClick={HandleClick}>
                        Add to Cart
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AddToCart