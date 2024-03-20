import React from 'react'
import tables from '../assets/categories/tables.png';
import chairs_icon from '../assets/categories/chairs_icon.png';
import lamp from '../assets/categories/lamp.png';
import laptop_stand_icon from '../assets/categories/laptop_stand_icon.png';
import monitor from '../assets/categories/monitor.png';
import mouse_pads from '../assets/categories/mouse_pads.png';
import plant from '../assets/categories/plant.png';
import cabinets from '../assets/categories/cabinets.png';
import { Link } from 'react-router-dom';
const Categories = () => {

    return (
        <>
            <div className='lg:flex justify-center items-center lg:space-x-5 mb-3 grid grid-cols-2 gap-8 m-auto lg:m-0 px-10 lg:mt-20 mt-20'>
                <div className='flex flex-col justify-center items-center w-32'>
                    <Link to={"/products/category/Table"} className='hover:text-yellow-500'>
                        <img src={tables} className='w-15' alt="" />
                        <p className='mt-3'>Tables</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <Link to={"/products/category/Chair"} className='hover:text-yellow-500'>
                        <img src={chairs_icon} className='w-15' alt="" />
                        <p className='mt-3'>Chairs</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <img src={laptop_stand_icon} className='w-15' alt="" />
                    <Link to={"/products/category/Monitor Stands"} className='hover:text-yellow-500'>
                    <p className='mt-3'>Laptop Stands</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <img src={monitor} className='w-15' alt="" />
                    <Link to={"/products/category/Monitor Stands"} className='hover:text-yellow-500'>
                    <p className='mt-3'>Monitor Stands</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <img src={cabinets} className='w-15' alt="" />
                    <Link to={"/products/category/Cabinets"} className='hover:text-yellow-500'>
                    <p className='mt-3'>Cabinets</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <img src={mouse_pads} className='w-15' alt="" />
                    <Link to={"/products/category/Mouse Pads"} className='hover:text-yellow-500'>
                    <p className='mt-3'>Mouse pads</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <img src={lamp} className='w-15' alt="" />
                    <Link to={"/products/category/Lamps"} className='hover:text-yellow-500'>
                    <p className='mt-3'>Study lamps</p>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center w-32'>
                    <Link to={'/products/category/Desk Plants'} className='hover:text-yellow-500'>
                        <img src={plant} className='w-15 m-auto' alt="" />
                        <p className='mt-3'>Desk Plant</p>
                    </Link>
                </div>
                <div>
                </div>
            </div>
            <div className='w-[85%] mt-10 border border-1 m-auto border-black'></div>

        </>
    )
}

export default Categories