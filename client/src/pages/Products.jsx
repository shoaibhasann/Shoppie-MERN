import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { STATUSES, fetchProducts } from "../features/productSlice";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const {
    data: { products, productsCount },
    status,
  } = useSelector((state) => state.products);


  if (status === STATUSES.FAIL) {
    return <ErrorHandler />;
  }

  return (
    <>
      <MetaData title="All Products" />
      <h1 className="text-3xl text-center border-b border-[#222222] w-[300px] mx-auto my-10">
        All Products
      </h1>
      {status === STATUSES.SUCCESS ? (
        <div className="flex justify-center flex-wrap gap-5">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Products;
