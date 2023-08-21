import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { numberWithCommas } from '../utils/utility';


function ProductCard({ product }) {

 const options = {
   edit: false,
   color: "rgba(20,20,20,0.1)",
   activeColor: "#faca15",
   size: window.innerWidth < 600 ? 20 : 25,
   value: product.ratings,
   isHalf: true,
 };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="flex flex-col gap-3 my-6 w-[280px] bg-white border border-gray-200 rounded-lg shadow">
        <img src={product.images[0]} alt={product.name} />
        <p className="text-2xl font-bold mx-4">{product.name}</p>
        <div className="flex items-center gap-5 mx-4">
          <ReactStars {...options} /> <span>({product.numberOfReviews})</span>
        </div>
        <div className="flex items-center gap-5 mx-4 mb-4">
          <span className="text-xl font-semibold">
            {"₹ " + numberWithCommas(product.price)}
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