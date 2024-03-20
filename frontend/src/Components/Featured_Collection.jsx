import React from 'react'
import { Link } from 'react-router-dom';
const Featured_Collection = () => {
    return (
        <>
            <div className='flex items-center flex-col mt-20'>
                <div>
                    <p className='font-semibold lg:text-4xl text-3xl napn'>Featured collection</p>
                </div>
                <div>
                    <p className='lg:w-[40rem] text-center lg:p-0 p-3 lg:text-base lg:mt-10 mt-1 text-slate-500 text-sm'>Duis enim fermentum id et molestie arcu sagittis, sapien turpis praesent consectetur dolor lobortis posuere adipiscing</p>
                </div>
                <div className='lg:grid grid-cols-3 gap-3 mt-24 '>
                    <div className='flex flex-col items-center'>
                        <img src="https://websitedemos.net/office-furniture-store-04/wp-content/uploads/sites/913/2021/07/office-furniture-store-home-featured-collection-img-3.png" alt="" className='' />
                        <Link to={'products/category/Chair'} className='hover:text-yellow-500'>
                        <p className='text-xl font-semibold mt-4'>Chairs</p>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center lg:mt-0 mt-10'>
                        <img src="https://websitedemos.net/office-furniture-store-04/wp-content/uploads/sites/913/2021/07/office-furniture-store-home-featured-collection-img-2.png" alt="" className='' />
                        <Link to={'products/category/Cabinets'} className='hover:text-yellow-500'>
                        <p className='text-xl font-semibold mt-4'>Cabinets</p>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center lg:mt-0 mt-10'>
                        <img src="https://websitedemos.net/office-furniture-store-04/wp-content/uploads/sites/913/2021/07/office-furniture-store-home-featured-collection-img-1.png" alt="" className='' />
                        <Link to={'products/category/Lamps'} className='hover:text-yellow-500'>
                        <p className='text-xl font-semibold mt-4'>Lamps</p>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Featured_Collection