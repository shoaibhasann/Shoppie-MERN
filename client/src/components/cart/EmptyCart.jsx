import React from 'react';
import EmptyCartImage from "../../assets/cart.png";
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="flex lg:mt-10 mt-7 items-center flex-col justify-center lg:gap-7 gap-5">
      <img className='w-[250px]' src={EmptyCartImage} alt="Your cart is empty" />
      <h4 className="text-2xl font-bold">Your cart is empty</h4>
      <Link to={'/products'} className="flex items-center justify-center gap-4 text-xl transition bg-[#ed0010] px-4 py-2 text-white font-bold  border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]">
        Shop now
      </Link>
    </div>
  );
}

export default EmptyCart