import React, { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { numberWithCommas } from "../../utils/Utility";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";
import { newReviewReset } from "../../redux/ReviewSlice";
import { useParams } from "react-router-dom";


function ProductDetailCard({ product }) {

  const { isAuthenticated } = useSelector((state) => state.user);

  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const increasedQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreasedQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextSlide = () => {
    if (value !== product.images.length - 1) {
      setValue(value + 1);
    } else if (value === product.images.length - 1) {
      setValue(0);
    }
  };

  const previousSlide = () => {
    if (value !== 0) {
      setValue(value - 1);
    } else {
      setValue(product.images.length - 1);
    }
  };

  const handleImageClick = (index) => {
    setValue(index);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faca15",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (e) => {
    e.preventDefault();
    const itemInCart = cartItems.find((item) => item.productId === product._id);
    if (itemInCart) {
      if (itemInCart.quantity + quantity > itemInCart.stock) {
        toast.warn("Not enough stock");
        return;
      } else {
        // Increment quantity if the item is already in the cart
        dispatch(addItemsToCart(product._id, quantity));
        toast.success("Item added to cart");
      }
    } else {
      dispatch(addItemsToCart(product._id, 1));
      toast.success("Item added to cart");
    }
  };

  // Calculate the discounted price
  const discountedPrice = Math.floor(
    product.price - product.price * (product.discount / 100)
  );

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);


  return (
    <>
      <section className="max-w-6xl mt-7 lg:mt-10  mx-auto grid grid-cols-1 lg:grid-cols-2">
        <article>
          <div className="relative">
            <img
              src={product.images[value].secure_url}
              alt=""
              className="w-full h-9/14"
            />
            <ul className="block lg:hidden">
              <li>
                <button
                  onClick={previousSlide}
                  className="bg-white cursor-pointer rounded-full p-2 shadow absolute top-1/2 left-2 -translate-y-1/2"
                >
                  <FaChevronLeft />
                </button>
              </li>
              <li>
                <button
                  onClick={nextSlide}
                  className="bg-white cursor-pointer rounded-full p-2 shadow absolute top-1/2 right-2 -translate-y-1/2"
                >
                  <FaChevronRight />
                </button>
              </li>
            </ul>
          </div>
          <ul className=" hidden lg:flex items-center justify-center lg:gap-7 flex-wrap mt-8 px-4">
            {product.images.map((item, index) => (
              <li
                onClick={() => handleImageClick(index)}
                key={item.secure_url}
                className={`${
                  index === value && " border-2 border-[#E50010] opacity-70 "
                } rounded-lg overflow-hidden cursor-pointer`}
              >
                <img src={item.secure_url} alt="" className="w-[85px]" />
              </li>
            ))}
          </ul>
        </article>
        <article className=" p-8 pb-10">
          <h2 className=" py-1 px-2 text-[#ed0010] uppercase tracking-wide text-sm font-bold inline-block mb-10">
            Shoppie Company
          </h2>

          <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-5xl">
            {product.name}
          </h1>

          <p className="text-slate-800 mb-10 font-semi-bold text-lg lg:text-xl leading-normal">
            {product.description}
          </p>

          <b
            className={
              product.stock < 1
                ? "text-red-600 font-semibold text-xl"
                : "text-green-600 font-semibold text-xl"
            }
          >
            {product.stock < 1 ? "Out Of Stock" : "In Stock"}
          </b>

          <div className="flex items-center gap-4 mb-10">
            <ReactStars {...options} />{" "}
            <span className="text-lg">
              {product.ratings.toFixed(1) + " Ratings"}
            </span>
            <span className="text-base text-gray-800">
              ({product.reviews.length + " Reviews"})
            </span>
          </div>

          <div className="flex items-center justify-between flex-wrap ">
            <ul className="flex items-center gap-5">
              <li className="text-slate-900 font-bold text-2xl lg:text-3xl">
                {"₹ " + numberWithCommas(discountedPrice)}
              </li>
              <li className="bg-[#f4eddd] py-1 px-2 text-[#ed0010] tracking-wide text-sm lg:text-base font-bold inline-block shadow ">
                {product.discount + "% off"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 text-base lg:text-xl mt-4">
            <s>{"₹ " + product.price}</s>
          </p>
          <div className="mt-8">
            <div className="flex items-center text-lg text-black cursor-pointer font-semibold">
              <div
                onClick={decreasedQuantity}
                className="border bg-[#f4eddd] border-slate-950 p-4  h-12 text-black"
              >
                <AiOutlineMinus />
              </div>
              <div className="border border-slate-950 border-r-0 border-l-0 p-4 w-12 h-12 flex items-center justify-center">
                {quantity}
              </div>
              <div
                onClick={increasedQuantity}
                className="border bg-[#f4eddd] border-slate-950 p-4 h-12 text-black"
              >
                <AiOutlinePlus />
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={addToCartHandler}
                className="flex items-center justify-center gap-4 text-xl transition bg-slate-950 p-4 text-white font-bold mt-5 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
              >
                <AiOutlineShoppingCart />
                {product.stock >= 1 ? "Add to cart" : "Notify me"}
              </button>
              <button className="flex items-center justify-center gap-4 text-xl transition bg-[#ed0010] p-4 text-white font-bold mt-5 w-full border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]">
                Buy now
              </button>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className={
                isAuthenticated ? "text-lg bg-[#f4eddd] py-1 px-2 text-[#ed0010] tracking-wide font-bold inline-block shadow border border-transparent hover:border-[#ed0010] my-8" : "hidden"
              }
            >
              Write a review
            </button>

            {/* Add the ReviewModal component */}
            <ReviewModal
              isOpen={isReviewModalOpen}
              onClose={() => setReviewModalOpen(false)}
              id={product._id}
            />
          </div>
        </article>
      </section>
    </>
  );
}

export default ProductDetailCard;
