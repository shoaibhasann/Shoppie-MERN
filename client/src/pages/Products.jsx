import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { STATUSES, fetchProducts } from "../features/productSlice";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Slider, Rating } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
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
    "Electronics",
    "Clothing",
    "Shoes",
    "Appliances",
    "Sports",
    "Accessories",
  ];

  if (status === STATUSES.FAIL) {
    return <h1 className="text-center text-3xl">Not found</h1>;
  }

  return (
    <>
      <MetaData title="All Products" />
      <h1 className="text-3xl text-center mx-auto my-10">
        {keyword ? `Products related to: ${keyword}` : "All Products"}
      </h1>
      {status === STATUSES.SUCCESS ? (
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="filter__box lg:w-80 border border-transparent m-5 border-r-slate-200 p-6 lg:p-8 mb-5 lg:mr-5 lg:ml-0 shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Filters</h1>
            <div className="mb-4">
              <p className="text-xl font-medium">Price</p>
              <Slider
                color="primary"
                value={price}
                onChange={(event,newPrice) => setPrice(newPrice)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={30}
                min={0}
                max={5000}
              />
            </div>
            <div className="mb-4">
              <p className="text-xl font-medium">Category</p>
              <ul>
                {categories.map((category, index) => (
                  <li
                    className="cursor-pointer"
                    onClick={() => setCategory(category)}
                    key={index}
                  >
                    - {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-xl font-medium">Ratings</p>
              <Rating
                name="size-medium"
                min={1}
                max={5}
                value={ratings}
                onChange={(event, newRatings) => setRatings(newRatings)}
              />
            </div>
          </div>
          <div className="products__section">
            <div className="products__container flex justify-center flex-wrap gap-3 lg:gap-5">
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
