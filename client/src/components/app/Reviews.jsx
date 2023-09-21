import React from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

function Reviews() {
  
  const product = useSelector((state) => state.productDetail.data.product);

  return (
    <div className="my-10 mx-auto">
      <h1 className="text-3xl text-center border-b border-[#222222] w-[300px] mx-auto my-20">
        Reviews
      </h1>
      {product.reviews.length > 0 ? (
        <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 place-items-center place-content-center">
          {product.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl font-medium">No Reviews Yet</h2>
      )}
    </div>
  );
}

export default Reviews;
