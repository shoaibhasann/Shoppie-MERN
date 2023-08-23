import React from "react";
import ReactStars from "react-rating-stars-component";

function ReviewCard({ review }) {
  
  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faca15",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  
  return (
    <div className="max-w-sm p-6 flex flex-col gap-5 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-7 h-7 flex items-center justify-center text-white rounded-full bg-[#ed0010]">
            {review.name.slice(0, 1)}
          </div>
          <span className="text-xl font-bold">{review.name}</span>
        </div>
        <ReactStars {...options} />
      </div>
      <p className="text-lg font-normal">{review.comment}</p>
      <span>{formatDate(review.createdAt)}</span>
    </div>
  );
}

export default ReviewCard;
