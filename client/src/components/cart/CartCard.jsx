import React from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/Utility';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/CartSlice';
import { RiDeleteBinLine } from 'react-icons/ri'

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
    <div className="flex flex-col items-center lg:flex-row lg:justify-start max-h-30 mb-6">
      <img
        className="w-[100px] lg:w-[140px] mr-3"
        src={item.image.secure_url}
        alt={item.name}
      />
      <div className="flex flex-col items-center gap-1">
        <Link
          className="font-medium text-base lg:text-lg text-center leading-5 hover:underline"
          to={`/product/${item.productId}`}
        >
          {item.name}
        </Link>
        <span className="font-medium text-base lg:text-lg tracking-wide">{`Price: ₹ ${numberWithCommas(
          discountedPrice
        )}`}</span>
        <button
          onClick={removeCartItem}
          className="flex items-center justify-center text-base lg:text-lg transition bg-black px-2 lg:px-4 py-1 text-white font-bold border border-transparent hover:text-black hover:bg-white hover:border-black"
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
}

export default CartCard