import React from "react";
import ReactStars from "react-rating-stars-component";

export const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

function ReviewCard({ review }) {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faca15",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="max-w-sm p-6 flex flex-col justify-around bg-slate-100 border border-gray-800 shadow h-[300px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review?.avatar.secure_url}
            alt="User Avatar"
            className="h-10 w-10 rounded-full object-cover cursor-pointer"
          />
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
