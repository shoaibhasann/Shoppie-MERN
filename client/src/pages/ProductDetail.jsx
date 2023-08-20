import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../features/productDetailSlice' 
import { STATUSES } from '../features/productSlice';
import ErrorHandler from '../components/ErrorHandler';
import ProductDetailCard from '../components/ProductDetailCard';
import Loader from '../components/Loader';

function ProductDetail() {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const { data: { product}, status } = useSelector((state) => state.productDetail);

  console.log(product);

  if(status === STATUSES.FAIL){
    return <ErrorHandler/>
  }

  return (
    <>
      {status === STATUSES.SUCCESS ? (
        <ProductDetailCard product={product} />
      ) : (
        <Loader/>
      )}
    </>
  );
}

export default ProductDetail