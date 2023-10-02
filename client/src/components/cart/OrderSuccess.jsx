import React from 'react'
import { Link } from 'react-router-dom'
import ReceivedImage from '../../assets/received.png';

function OrderSuccess() {
  return (
    <div className="flex my-10 h-[50vh] items-center flex-col justify-center gap-5">
      <div>
        <img className='w-[200px]' src={ReceivedImage} alt="Order Received" />
      </div>
      <p className="text-2xl md:text-4xl font-extrabold text-center">
        Your Order has been placed successfully
      </p>
      <Link to='/orders'>
        <button className="text-[#fff] text-xl bg-[#222222] px-8 py-2 md:px-8 md:py-4 border-2 border-transparent hover:border-[#222222] hover:bg-[#faf9f8] hover:text-[#222222] transition tracking-wide">
          View Orders
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess