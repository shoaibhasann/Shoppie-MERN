import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../features/productDetailSlice' 
import { STATUSES } from '../features/ProductSlice';
import ErrorHandler from '../components/ErrorHandler';
import ProductDetailCard from '../components/ProductDetailCard';
import Loader from '../components/Loader';
import Reviews from '../components/Reviews';
import MetaData from '../components/MetaData';

function ProductDetail() {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const { data: { product}, status } = useSelector((state) => state.productDetail);

  if(status === STATUSES.FAIL){
    return <ErrorHandler message="Page not found" />;
  }

  return (
    <>
      <MetaData
        title={`${product?.name} - Elevate Your Experience with Modern Design`}
      />
      {status === STATUSES.SUCCESS ? (
        <>
          <ProductDetailCard product={product} />
          <Reviews />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductDetail