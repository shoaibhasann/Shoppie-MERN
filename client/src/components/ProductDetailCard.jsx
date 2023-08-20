import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { numberWithCommas } from "../utils/utility";
import ReactStars from "react-rating-stars-component";

function ProductDetailCard({product}) {

  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);


  const nextSlide = () => {
    if (value !== product.image.length - 1) {
      setValue(value + 1);
    } else if (value === product.image.length - 1) {
      setValue(0);
    }
  };

  const previousSlide = () => {
    if (value !== 0) {
      setValue(value - 1);
    } else {
      setValue(product.image.length - 1);
    }
  };

//    const options = {
//      edit: false,
//      color: "rgba(20,20,20,0.1)",
//      activeColor: "#faca15",
//      size: 20,
//      value: product.ratings,
//      isHalf: true,
//    };

  return (
    <section className="max-w-6xl lg:mt-10  mx-auto grid grid-cols-1 lg:grid-cols-2">
      <article>
        <div>
          {/* <img src={url} alt="" className="w-full h-9/12" /> */}
          <ul className="block lg:hidden">
            <li>
              <button
                onClick={previousSlide}
                className="bg-white cursor-pointer rounded-full p-5 shadow absolute top-1/2 left-4 -translate-y-1/2"
              >
                <FaChevronLeft />
              </button>
            </li>
            <li>
              <button
                onClick={nextSlide}
                className="bg-white cursor-pointer rounded-full p-5 shadow absolute top-1/2 right-4 -translate-y-1/2"
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>
        </div>
        {/* <ul className=" hidden lg:flex items-center justify-between flex-wrap mt-8 px-4">
          {product.image.map((item, index) => (
            <li
              onClick={() => setValue(index)}
              key={item.id}
              className={`${
                index === value && "border-2 border-[#E50010] opacity-70 "
              } border-2 border-transparent rounded-lg overflow-hidden cursor-pointer`}
            >
              <img src={item.url} alt="" className="w-[85px]" />
            </li>
          ))}
        </ul> */}
      </article>
      <article className=" p-8 pb-10">
        <h2 className=" py-1 px-2 text-[#ed0010] uppercase tracking-wide text-sm font-bold inline-block mb-10">
          Shoppie Company
        </h2>

        <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-5xl">
          {product?.name}
        </h1>

        <p className="text-slate-800 mb-10 font-semi-bold text-lg lg:text-xl leading-loose">
          {product?.description}
        </p>

        <div className="flex items-center justify-between flex-wrap ">
          <ul className="flex items-center gap-5">
            {/* <li className="block">
              <ReactStars {...options} />
              <span>({product?.numberOfReviews + " Reviews"})</span>
            </li> */}
            <li className="text-slate-900 font-bold text-2xl lg:text-3xl">
              {"₹ " + numberWithCommas(product?.price)}
            </li>
            <li className="bg-[#f4eddd] py-1 px-2 text-[#ed0010] tracking-wide text-sm lg:text-base font-bold inline-block rounded shadow ">
              50% off
            </li>
          </ul>
        </div>
        <p className="text-slate-600 text-base lg:text-xl mt-4">
          <s>₹250.00</s>
        </p>
        <div className="mt-8">
          <div className="flex items-center text-lg text-black cursor-pointer font-semibold">
            <div
              onClick={() =>
                setQuantity(quantity === 1 ? quantity : quantity - 1)
              }
              className="border bg-[#f4eddd] border-slate-950 p-4  h-12 text-black"
            >
              <AiOutlineMinus />
            </div>
            <div className="border border-slate-950 border-r-0 border-l-0 p-4 w-12 h-12 flex items-center justify-center">
              {quantity}
            </div>
            <div
              onClick={() => setQuantity(quantity + 1)}
              className="border bg-[#f4eddd] border-slate-950 p-4 h-12 text-black"
            >
              <AiOutlinePlus />
            </div>
          </div>
          <div className="mt-8">
            <button className="flex  items-center justify-center gap-4 text-xl bg-[#ed0010] p-4 text-white font-bold mt-5 w-full hover:text-[#ed0010] hover:bg-[#faf9f8] hover:border-2 hover:border-[#e50010]">
              <AiOutlineShoppingCart />
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ProductDetailCard;
