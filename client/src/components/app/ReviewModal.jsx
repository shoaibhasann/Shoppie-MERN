import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addNewReview } from "../../redux/ReviewSlice.js";
import { toast } from "react-toastify";

const maxCharacterLimit = 250;

function ReviewModal({ isOpen, onClose, id }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const dispatch = useDispatch();

  const submitReview = async () => {
    try {
      // Check if the comment exceeds the character limit
      if (comment.length > maxCharacterLimit) {
        toast.error(
          `Character limit exceeded. Maximum ${maxCharacterLimit} characters allowed.`
        );
        return;
      }
      dispatch(addNewReview({ productId: id, rating, comment }));
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const options = {
    edit: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faca15",
    size: window.innerWidth < 600 ? 20 : 25,
    value: rating,
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center z-50`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 z-10 w-80">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <div className="mb-4">
          <ReactStars
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            {...options}
          />
        </div>
        <textarea
          rows="4"
          placeholder={`Write your review (Maximum ${maxCharacterLimit} characters)...`}
          className="w-full p-2 border border-gray-300 mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-[#ed0010] text-white mr-2"
            onClick={submitReview}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
