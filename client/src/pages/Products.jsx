import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/app/ProductCard.jsx";
import MetaData from "../components/layout/MetaData.jsx";
import Loader from "../components/layout/Loader.jsx";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Slider, Rating } from "@mui/material";
import { BsFilter } from 'react-icons/bs';
import RejectedImage from '../assets/rejected.png'
import { STATUSES, fetchProducts } from "../redux/ProductSlice.js";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500000]);
  const [category, setCategory] = useState(null);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  const {
    data: { products, productsCount, resultPerPage },
    status,
  } = useSelector((state) => state.products);

  const totalPages = productsCount / resultPerPage;

  const categories = [
    "Smartphones",
    "Computers",
    "Games",
    "Shoes",
    "Clothing",
    "Accessories",
    "Home Decor",
    "Luxury Beauty",
    "Kitchen",
  ];

  if (status === STATUSES.FAIL) {
    return (
      <div className="flex lg:mt-10 mt-7 items-center flex-col justify-center lg:gap-7 gap-5">
        <img className="w-[200px]" src={RejectedImage} alt="Your cart is empty" />
        <h4 className="text-2xl font-bold">OOPS! Product not found</h4>
        <Link
          to={"/"}
          className="flex items-center justify-center gap-4 text-xl transition bg-[#ed0010] px-4 py-2 text-white font-bold  border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <MetaData title="All Products - Shoppie" />
      <h1 className="text-3xl text-center mx-auto my-10">
        {keyword ? `Showing results for : ${keyword}` : "All Products"}
      </h1>
      {status === STATUSES.SUCCESS ? (
        <div className="flex flex-col-reverse gap-8 lg:flex-row">
          <div className="filter__box flex flex-col justify-between max-h-screen bg-white lg:w-80 border border-transparent  border-slate-200 p-6 lg:p-8 lg:m-0">
            <div className="text-lg font-semibold flex gap-2 items-center border border-transparent border-b-slate-300 pb-5">
              {" "}
              <BsFilter className="text-2xl font-semibold" /> Filters
            </div>
            <div className=" border border-transparent border-b-slate-300 pb-5">
              <p className="text-xl font-semibold">Price</p>
              <Slider
                color="primary"
                value={price}
                onChange={(event, newPrice) => setPrice(newPrice)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={500}
                min={0}
                max={500000}
              />
            </div>
            <div className=" border border-transparent border-b-slate-300 pb-5">
              <p className="text-xl font-semibold">Category</p>
              <ul className="pl-2">
                {categories.map((category, index) => (
                  <li
                    className="cursor-pointer hover:text-[#ed0010]"
                    onClick={() => setCategory(category)}
                    key={index}
                  >
                      {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className=" border border-transparent border-b-slate-300 pb-5">
              <p className="text-xl font-semibold">Ratings</p>
              <Rating
                name="size-medium"
                min={1}
                max={5}
                value={ratings}
                onChange={(event, newRatings) => setRatings(newRatings)}
              />
            </div>
          </div>
          <div className="products__section lg:mr-8">
            <div className="products__container grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-3 lg:gap-x-8 place-items-center place-content-center mx-auto">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div
              className={
                totalPages <= 1 ? "hidden" : "flex justify-center my-5"
              }
            >
              <button
                className="px-3 py-1 border  mr-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <AiOutlineLeft />
              </button>
              {/* Render pagination buttons dynamically based on the number of pages */}
              {[...Array(Math.ceil(totalPages))].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border  mr-2 ${
                    currentPage === index + 1 ? "bg-[#e50010] text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border  mr-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products;
