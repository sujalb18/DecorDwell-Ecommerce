import React from 'react'
import delivery from '../assets/delivery.png';
import clock from '../assets/clock.png';
import money from '../assets/money.png';
import gift from '../assets/gift.png';
const Features = () => {
    return (
        <>
            <div className='lg:w-[60rem] flex m-auto border-[1px] border-yellow-400'></div>
            <div className='bg-gray-100 flex lg:flex-row flex-col lg:justify-evenly lg:h-28 lg:items-center items-start lg:px-0 px-10 h-72'>
                <div className='flex mt-4'>
                    <img src={delivery} alt="" className='w-6 h-6' />
                    <div className='text-sm mx-4'>
                        <p className='napn text-lg font-semibold'>Free Shipping</p>
                        <p className='text-slate-400'>Lorem ipsum amet consectetur</p>
                    </div>
                </div>
                <div className='flex mt-4'>
                    <img src={clock} alt="" className='w-6 h-6' />
                    <div className='text-sm mx-4'>
                        <p className='napn text-lg font-semibold'>Support 24/7</p>
                        <p className='text-slate-400'>Lorem ipsum amet consectetur</p>
                    </div>
                </div>
                <div className='flex mt-4'>
                    <img src={money} alt="" className='w-6 h-6' />
                    <div className='text-sm mx-4'>
                        <p className='napn text-lg font-semibold'>Money return</p>
                        <p className='text-slate-400'>Lorem ipsum amet consectetur</p>
                    </div>
                </div>
                <div className='flex mt-4'>
                    <img src={gift} alt="" className='w-6 h-6' />
                    <div className='text-sm mx-4'>
                        <p className='napn text-lg font-semibold'>Member discount</p>
                        <p className='text-slate-400'>Lorem ipsum amet consectetur</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features