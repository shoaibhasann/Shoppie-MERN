import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { numberWithCommas } from "../utils/Utility";

function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faca15",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  // Calculate the discounted price
  const discountedPrice = Math.floor(
    product.price - product.price * (product.discount / 100)
  );

  return (
    <Link to={`/product/${product._id}`}>
      <div className="flex flex-col gap-3 my-6 w-[280px] lg:h-[500px] bg-white border border-gray-200 shadow">
        <div>
          <img
            className="h-full w-full object-cover"
            src={product.images[0].secure_url}
            alt={product.name}
          />
        </div>
        <p className="text-2xl font-bold mx-4">{product.name}</p>
        <div className="flex items-center gap-5 mx-4">
          <ReactStars {...options} />{" "}
          <span>({product.numberOfReviews + " Reviews"})</span>
        </div>
        <div className="flex items-center gap-5 mx-4 mb-4">
          <span className="text-xl font-semibold">
            {"₹ " + numberWithCommas(discountedPrice)}{" "}
          </span>
          <button className="text-2xl px-4 py-2 text-[#222222]">
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
