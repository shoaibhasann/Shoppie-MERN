import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import MetaData from "../components/MetaData";
import { STATUSES, fetchProducts } from "../features/productSlice";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();

  const {keyword} = useParams();
  console.log(keyword);

  useEffect(() => {
    if(keyword){
      dispatch(fetchProducts(keyword));
    } else{
      dispatch(fetchProducts());
    }
  }, [dispatch, keyword]);

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
      <h1 className="text-3xl text-center mx-auto my-10">
        {keyword ? `Products related to: ${keyword}` : 'All Products'}
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
