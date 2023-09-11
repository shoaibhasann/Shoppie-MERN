import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { numberWithCommas } from "../utils/Utility";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../redux/CartSlice";
import { toast } from "react-toastify";

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

  const dispatch = useDispatch();

  const addToCartHandler = (event) => {
    event.preventDefault();
    dispatch(addItemsToCart(product._id, 1));
    toast.success('Item added to cart')
  }

  return (
    <Link to={`/product/${product._id}`}>
      <div className="product__card w-80 min-h-[10rem] shadow-lg rounded-md overflow-hidden bg-white text-gray-700">
        <div className="w-full h-8/12">
          <img
            className="w-full h-full object-cover"
            src={product.images[0].secure_url}
            alt={product.name}
          />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <p className="text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
            {product.name}
          </p>
          <div className="flex items-center gap-5">
            <ReactStars {...options} />
            <span className="text-sm text-gray-500">
              {product.ratings.toFixed(1) + " Ratings"}
            </span>
          </div>
          <div>
            <span className="text-xl font-bold">
              {"₹ " + numberWithCommas(discountedPrice)}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm line-through opacity-50">
                {"₹ " + numberWithCommas(product.price)}
              </span>
              <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
                {product.discount + "% off"}
              </span>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={addToCartHandler} className=" bg-red-400 px-6 py-2 rounded-md text-white font-medium tracking-wider transition">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
