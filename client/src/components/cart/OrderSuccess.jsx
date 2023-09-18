import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function OrderSuccess() {
  return (
    <div className="flex lg:mt-10 mt-7 h-[50vh] items-center flex-col justify-center lg:gap-7 gap-5">
      <div>
        <AiFillCheckCircle className="text-[#ed0010] text-3xl md:text-6xl" />
      </div>
      <p className="text-2xl md:text-4xl font-extrabold text-center">
        Your Order has been placed successfully
      </p>
      <Link to='/order/me'>
        <button className="text-[#fff] text-xl bg-[#222222] px-8 py-2 md:px-8 md:py-4 border-2 border-transparent hover:border-[#222222] hover:bg-[#faf9f8] hover:text-[#222222] transition tracking-wide">
          View Orders
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess