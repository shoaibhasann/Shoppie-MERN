import React from 'react';
import ReactStars from "react-rating-stars-component";

function ReviewCard() {

         const options = {
           edit: false,
           color: "rgba(20,20,20,0.1)",
           activeColor: "#faca15",
           size: window.innerWidth < 600 ? 20 : 25,
           value: 4.3,
           isHalf: true,
         };
  return (
    <div className="max-w-sm p-6 flex flex-col gap-5 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-7 h-7 flex items-center justify-center text-white rounded-full bg-[#ed0010]">
            S
          </div>
          <span className="text-lg font-bold">Shoaib Hasan</span>
        </div>
        <ReactStars {...options} />
      </div>
      <p>
        The device has a clean design and the metal housing feels sturdy in my
        hands. Soft rounded corners make it a pleasure to look at.
      </p>
      <span>Feb 13, 2021</span>
    </div>
  );
}

export default ReviewCard