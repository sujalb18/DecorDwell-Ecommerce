import React from 'react'
import woodendesk from '../assets/wooden_desk.jpg';
import chairs from '../assets/chairs.jpg';
import laptopstands from '../assets/laptop_stands.jpg';
import { Link } from 'react-router-dom';
const Semi_Ad = () => {
    return (
        <>
            <div className='lg:flex block mt-20 justify-center lg:space-x-8'>
                <div className='w-[90%] lg:w-2/4 relative m-auto lg:m-0 mb-5 lg:mb-0'>
                    <img src={woodendesk} alt="" />
                    <div className='absolute top-3 left-3'>
                        <Link to={'products/category/Chair'} className='text-xl hover:underline font-semibold'>Wooden Desk &#8594;</Link>
                    </div>
                </div>
                <div className='w-[90%] m-auto lg:w-1/4 lg:m-0'>
                    <div className='relative'>
                        <img src={chairs} alt="" />
                        <div className='absolute top-64 left-3'>
                            <Link to={'products/category/Chair'} className='text-xl hover:underline font-semibold'>Chairs &#8594;</Link>
                        </div>
                    </div>
                    <div className='mt-6 relative'>
                        <img src={laptopstands} alt="" />
                        <div className='absolute top-60 left-3'>
                            <Link to={'products/category/Monitor Stands'} className='text-xl hover:underline font-semibold'>Laptop Desk &#8594;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Semi_Ad