import React from 'react'
import ReviewCard from './ReviewCard';

function Reviews() {

     const reviews = [1,2,3];

  return (
    <div className="my-10 mx-auto">
      <h1 className="text-3xl text-center border-b border-[#222222] w-[300px] mx-auto my-20">
        Reviews
      </h1>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 place-items-center'>
        {reviews.length > 0 ? (
          <>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </>
        ) : (
          <div className="text-2xl text-center">No Reviews Yet</div>
        )}
      </div>
    </div>
  );
}

export default Reviews