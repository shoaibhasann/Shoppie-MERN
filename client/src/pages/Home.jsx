import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../features/productSlice";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ErrorHandler from "../components/ErrorHandler";

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
      <div>
        <h1 className="text-3xl text-center mx-auto my-20">
          Featured Products
        </h1>
        <div
          id="container"
          className="flex items-center justify-center flex-wrap gap-5"
        >
          {status === STATUSES.SUCCESS ? (
            products &&
            products.map((product) => (
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
