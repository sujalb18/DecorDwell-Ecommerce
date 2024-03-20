import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
const AllReviews = ({ productId , reviews, setReviews }) => {
    const [fetchedReviews, setFetchedReviews] = useState([]);
    const auth = useAuth();
    console.log(auth);
    const loggedInUserId = auth.user.Userid;
    console.log(loggedInUserId);

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews/${productId}`, {
            withCredentials: 'include'
        }).then(response => {
            console.log(response.data);
            setFetchedReviews(response.data)
        })
            .catch(error => console.error(error));
    }, [productId]);

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/reviews/${reviewId}`, {
                withCredentials:'include'
            });

            if (response.status === 200) {
                setFetchedReviews(prevReviews => prevReviews.filter((review) => review._id !== reviewId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='border-2 mt-10 p-5'>
            <h2 className='mt-3 font-bold text-lg'>Reviews</h2>
            {fetchedReviews.length === 0 && (
                <p>No Reviews Yet</p>
            )}
            {fetchedReviews.length > 0 && (
                <div className='reviews'>
                    {fetchedReviews.map(review => {
                    var totalStars = [];
                    for(var i=0; i<review.rating; i++){
                        totalStars.push(<i className="fa-solid fa-star w-2 h-2 mx-1.5 text-yellow-400"></i>) 
                    }
                    
                        return (
                                <div>
                                    <div className='flex mt-4' key={review.id}>
                                        <div className='rounded-full bg-black w-10 h-10 my-2'></div>
                                        <div className='flex items-center mx-2' >
                                            <p className='text-base'>{review.user.name}</p>
                                        </div>
                                    </div>
                                    <div className='flex cursor-pointer'>
                                        <div><p>{totalStars}</p></div>
                                        <div className='mx-3 font-bold lg:text-base text-sm'><p>{review.title}</p></div>
                                    </div>
                                    <div className='mb-3 mt-3 text-sm'>
                                        <p>{review.comment}</p>
                                    </div>
                                    <div>
                                    {loggedInUserId  === review.user._id && (
                                        <button className='cursor-pointer underline' onClick={() => handleDeleteReview(review._id)}>Delete</button>
                                    )}
                                    </div>
                                </div>
                            )
                        })}

                </div>
            )}
            </div>
        </>
    )
}

export default AllReviews