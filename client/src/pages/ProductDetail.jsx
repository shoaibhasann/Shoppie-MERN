import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUSES } from '../redux/ProductSlice.js';
import ErrorHandler from '../components/layout/ErrorHandler.jsx';
import ProductDetailCard from '../components/app/ProductDetailCard.jsx';
import Loader from '../components/layout/Loader.jsx';
import Reviews from '../components/app/Reviews.jsx';
import MetaData from '../components/layout/MetaData.jsx';
import { toast } from 'react-toastify';
import { newReviewReset } from '../redux/ReviewSlice.js';
import { fetchProduct } from '../redux/ProductDetailSlice.js';

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

    const { review, error } = useSelector((state) => state.newReview);

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(newReviewReset());
      }

      if (review && review.success) {
        toast.success(review.message);
        dispatch(newReviewReset());
      }
    }, [review, error, id]);

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