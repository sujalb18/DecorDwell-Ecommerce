import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <>
            <div className='topfooter mt-20 text-white flex flex-col justify-center items-center'>
                <div>
                    <p className='font-bold tracking-wide'>CUSTOM SETUPS</p>
                </div>
                <div className='lg:w-[60%] w-[80%] tracking-wide'>
                    <p className='lg:text-7xl text-2xl font-bold mt-10 text-center'>Let’s build your dream working space</p>
                </div>
                <div className='mt-10'>
                    <button type="button" className="focus:outline-none text-black bg-[#fbd84b] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-md text-sm px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900 ">Shop Now &#8594;</button>
                </div>
            </div>
            <div className='flex lg:flex-row flex-col lg:justify-center lg:space-x-40 lg:p-20 '>
                <div className='flex space-x-3'>
                    <div>
                        <img src={logo} width={30} alt="" />
                    </div>
                    <div className='mt-1'>
                        <p className='font-bold text-center lg:text-start lg:text-xl tracking-wide lg:mt-0 mt-10'>DecorDwell</p>
                    </div>
                </div>
                <div>
                    <p className='font-semibold text-xl text-center lg:text-start mt-10 lg:mt-0'>About Us</p>
                    <ul className='text-sm text-slate-500 mt-2 space-y-2 text-center flex flex-col lg:text-start'>
                        <Link to={'/about'}>About Us</Link>
                        <Link to={'/contact'}>Contact Us</Link>
                        <Link to={'/'}>Careers</Link>
                        <Link to={'/'}>Customer Support</Link>
                    </ul>
                </div>
                <div>
                    <p className='font-semibold text-xl text-center lg:text-start mt-10 lg:mt-0'>Categories</p>
                    <ul className='text-sm text-slate-500 mt-2 space-y-2 text-center flex flex-col lg:text-start'>
                        <Link to={'/products/category/Table'}>Table</Link>
                        <Link to={'/products/category/Chair'}>Chairs</Link>
                        <Link to={'/products/category/Cabinets'}>Cabinets</Link>
                        <Link to={'/products/category/MonitorStands'}>Laptop Stands</Link>
                    </ul>
                </div>
                <div>
                    <p className='font-semibold text-xl text-center lg:text-start mt-10 lg:mt-0'>Information</p>
                    <ul className='text-sm text-slate-500 mt-2 space-y-2 text-center lg:text-start'>
                        <li>FAQs</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
            </div>
            <div className='lg:mt-2 mt-10 mb-2 border-2 text-black '></div>
            <div>
                <p className='text-sm text-center my-5 text-gray-500'>Copyright © 2024 DecorDwell</p>
            </div>
        </>
    )
}

export default Footer