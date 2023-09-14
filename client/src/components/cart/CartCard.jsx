import React from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/Utility';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/CartSlice';

function CartCard({item}) {

  const dispatch = useDispatch();

  const removeCartItem = () => {

    dispatch(removeFromCart(item.productId))
  }

  // Calculate the discounted price
  const discountedPrice = Math.floor(
    item.price - item.price * (item.discount / 100)
  );

  return (
    <div className="flex flex-col items-start lg:flex-row  lg:items-center lg:justify-start max-h-30 mb-6">
      <img
        className="w-[150px] lg:w-[180px]"
        src={item.image[0].secure_url}
        alt={item.name}
      />
      <div className="flex flex-col items-center gap-2">
        <Link
          className="font-medium text-base lg:text-lg text-center leading-5 hover:underline"
          to={`/product/${item.productId}`}
        >
          {item.name}
        </Link>
        <span className='font-semibold text-base lg:text-lg tracking-wide'>{`Price: ₹ ${numberWithCommas(discountedPrice)}`}</span>
        <button onClick={removeCartItem} className="flex items-center justify-center text-base transition bg-[#ed0010] px-2 lg:px-4 py-1 text-white font-bold border border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartCard