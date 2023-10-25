import React, { useEffect } from "react";
import ProductCard from "../components/app/ProductCard.jsx";
import MetaData from "../components/layout/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../redux/ProductSlice.js";
import Hero from "../components/layout/Hero.jsx";
import Loader from "../components/layout/Loader.jsx";
import ErrorHandler from "../components/layout/ErrorHandler.jsx";

function Home() {
  const dispatch = useDispatch();

  const { data: { products, productsCount }, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if(status === STATUSES.FAIL){
    return <ErrorHandler message='Page not found'/>
  }


  return (
    <>
      <MetaData title="Shoppie: Where Shopping Meets Convenience and Style" />
      <Hero />
      <div className=" p-2 lg:p-8 mb-8">
        <h1 className="text-3xl text-center mx-auto my-20">
          Featured Products
        </h1>
        <div
          id="container"
          className="flex items-center justify-center flex-wrap gap-7 lg:justify-around"
        >
          {status === STATUSES.SUCCESS ? (
            products &&
            products.slice(0,8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
