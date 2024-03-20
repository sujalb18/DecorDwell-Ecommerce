import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import Footer from './Footer';

const ContactUs = () => {
    const [contacts , setContacts] = useState({
        name: "" , email: "" , messages: ""
    });
    let name , value;
    const HandleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setContacts({...contacts , [name]: value});
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const {name, email , messages} = contacts;
        const res = await axios.post('http://localhost:5000/contacts', {
            name, email ,messages
        }, {
            withCredentials: 'include'
        })
        if(res.status === 200){
            window.alert('Form Sent Successfully');
        }else{
            window.alert('Form not sent');
        }
    }

    return (
        <>
            <div className='contact'>
                <Navbar />
                <div className='lg:flex items-center justify-evenly lg:mt-32 mt-10 p-4'>
                    <div>
                        <p className='font-bold lg:text-6xl text-3xl text-white mb-5 lg:mb-0 napn'>Contact Us</p>
                    </div>
                    <div className='lg:w-2/5 w-4/5 text-white'>
                        <div className='lg:w-32 w-10 h-[1px] bg-yellow-500'></div>
                        <p className='mt-10 lg:text-base text-sm'>Porta tellus suscipit eget arcu eu nec quis scelerisque nam vitae, turpis integer iaculis tristique vivamus mattis egestas.</p>
                    </div>
                </div>
            </div>
            <div className='flex lg:flex-row flex-col  mt-20 justify-center'>
                <div className='lg:w-1/4 w-full p-4 napn'>
                    <p className='font-bold text-4xl tracking-wide napn mb-5'>Get in touch</p>
                    <p className='font-semibold text-sm mt-2'><i className="fa-solid fa-location-dot text-yellow-400"></i><p className='inline-block mx-3'>Address</p></p>
                    <p className='mx-5 mt-2 text-sm text-slate-800'>123 Demo St, San Francisco, CA 45678, United States </p>

                    <div className='lg:w-96 h-[1px] bg-yellow-400 my-7'></div>
                    <p className='text-xl napn font-bold mb-5'>Customer service</p>
                    <p className='text-slate-600 text-sm mb-4'>Diam id quis quam pulvinar sodales fermentum, elit risus tristique praesent sit dictumst vel amet.</p>
                    <p className='text-slate-600 text-sm mb-5'><i className="fa-solid fa-phone text-yellow-400"></i><p className='inline-block mx-3'>+1 123-456-7890</p></p>
                    <p className='text-slate-600 text-sm mb-5'><i className="fa-solid fa-envelope text-yellow-400"></i><p className='inline-block mx-3'>mail@example.com </p></p>
                    <p className='text-slate-600 text-sm'><i className="fa-solid fa-clock text-yellow-400"></i> <p className='inline-block mx-2'>08.00 - 16.00 EST</p></p>
                </div>
                <div className='lg:w-1/2 w-full p-4'>


                    <form className="lg:w-4/5 w-full mx-auto">
                        <div className="mb-5">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name<sup className='text-red-500'>*</sup></label>
                            <input type="text" id="name" name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={contacts.name} onChange={HandleChange} required />
                        </div>
                        <div className="mb-5">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email<sup className='text-red-500'>*</sup></label>
                            <input type="email" name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={contacts.email} onChange={HandleChange} required />
                        </div>

                        <div className='mb-5'>
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900">Comment or Message<sup className='text-red-500'>*</sup></label>
                            <textarea id="messages" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..." name='messages' value={contacts.messages} onChange={HandleChange}></textarea>
                        </div>

                        <button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={HandleSubmit}>Submit</button>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs