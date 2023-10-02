import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUSES } from '../redux/ProductSlice';
import ErrorHandler from '../components/layout/ErrorHandler';
import ProductDetailCard from '../components/app/ProductDetailCard';
import Loader from '../components/layout/Loader';
import Reviews from '../components/app/Reviews';
import MetaData from '../components/layout/MetaData';
import { toast } from 'react-toastify';
import { newReviewReset } from '../redux/ReviewSlice';
import { fetchProduct } from '../redux/ProductDetailSlice';

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