import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { STATUSES, fetchProducts } from "../features/productSlice";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Products() {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  // State to manage current page
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  useEffect(() => {
    if (keyword) {
      dispatch(fetchProducts(keyword, currentPage));
    } else {
      dispatch(fetchProducts(undefined,currentPage));
    }
  }, [dispatch, keyword, currentPage]);

  const {
    data: { products, productsCount, resultPerPage },
    status,
  } = useSelector((state) => state.products);

  const totalPages = productsCount/resultPerPage;

  if (status === STATUSES.FAIL) {
    return <ErrorHandler message={"Products not found"} />;
  }

  return (
    <>
      <MetaData title="All Products" />
      <h1 className="text-3xl text-center mx-auto my-10">
        {keyword ? `Products related to: ${keyword}` : "All Products"}
      </h1>
      {status === STATUSES.SUCCESS ? (
        <>
          <div className="flex justify-center flex-wrap gap-3 lg:gap-5">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div
            className={totalPages <= 1 ? "hidden" : "flex justify-center my-5"}
          >
            <button
              className="px-3 py-1 border rounded-md mr-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <AiOutlineLeft />
            </button>
            {/* Render pagination buttons dynamically based on the number of pages */}
            {[...Array(Math.ceil(totalPages))].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded-md mr-2 ${
                  currentPage === index + 1 ? "bg-[#e50010] text-white" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded-md mr-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <AiOutlineRight />
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Products;
