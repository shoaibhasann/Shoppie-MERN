import React from "react";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/productSlice";
import Hero from "../components/Hero";

function Home() {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <MetaData title="Shoppie: Where Shopping Meets Convenience and Style" />
      <Hero />
      <h1 className="text-3xl text-center border-b border-[#222222] w-[300px] mx-auto my-20">
        Featured Products
      </h1>
      <div id="container"  className="flex items-center justify-center flex-wrap gap-5">
        
      </div>
    </>
  );
}

export default Home;
