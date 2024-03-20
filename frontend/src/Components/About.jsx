import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
    return (
        <>
            <div className='about'>
                <Navbar />
                <div className='lg:flex items-center justify-evenly lg:mt-32 mt-10 p-4'>
                    <div>
                        <p className='font-bold lg:text-6xl text-3xl text-white mb-5 lg:mb-0 napn'>About Us</p>
                    </div>
                    <div className='lg:w-2/5 w-4/5 text-white'>
                        <div className='lg:w-32 w-10 h-[1px] bg-yellow-500'></div>
                        <p className='mt-10 lg:text-base text-sm'>Porta tellus suscipit eget arcu eu nec quis scelerisque nam vitae, turpis integer iaculis tristique vivamus mattis egestas.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About