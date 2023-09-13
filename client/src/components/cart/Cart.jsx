import React from 'react'
import CartCard from './CartCard'
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import {
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { numberWithCommas } from '../../utils/Utility';

function Cart() {

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  if(cartItems.length <= 0){
    return <EmptyCart/>
  }

  return (
    <div className="cart__page my-5 lg:my-10">
      <h1 className="text-center text-3xl font-bold my-5">Shopping bag</h1>
      <div className="cart__header grid grid-cols-[3fr_1fr_1fr] gap-4 lg:grid-cols-[4fr_1fr_1fr]  px-5 py-2 bg-[#ed0010] m-auto text-white w-[90%]">
        <p>Product</p>
        <p>Quantity</p>
        <p className="text-end">Subtotal</p>
      </div>

      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div className="cart_container bg-white grid grid-cols-[3fr_1fr_1fr] lg:grid-cols-[4fr_1fr_1fr] lg:px-5 py-2 m-auto w-[90%]">
            <CartCard key={item.productId} item={item} />
            <div className="flex items-center text-base lg:text-lg text-black cursor-pointer font-medium px-5 lg:px-0 ">
              <div className="border bg-[#f4eddd] border-slate-950 p-0.5 h-6 lg:p-1.5 lg:h-8 text-black">
                <AiOutlineMinus />
              </div>
              <div className="border border-slate-950 border-r-0 border-l-0 p-0.5 h-6 w-6 lg:p-1.5 lg:w-8 lg:h-8 flex items-center justify-center">
                {item.quantity}
              </div>
              <div className="border bg-[#f4eddd] border-slate-950 p-0.5 h-6 lg:p-1.5 lg:h-8 text-black">
                <AiOutlinePlus />
              </div>
            </div>
            <div className="flex items-center justify-start lg:justify-end font-medium text-sm lg:text-lg">
              {'₹ ' + numberWithCommas(
                item.quantity *
                  Math.floor(item.price - item.price * (item.discount / 100))
              )}
            </div>
          </div>
        ))}

      <div className="grid grid-cols-[0fr_2fr] lg:grid-cols-[2fr_1.2fr]">
        <div></div>
        <div className="border-dashed border-t-[3px] border-[#ed0010] mx-4 lg:mx-16 my-4 py-3 flex justify-between">
          <p className="text-lg font-semibold">Gross Total</p>
          <p className="text-xl font-bold">₹600</p>
        </div>
        <div></div>
        <div className="flex justify-center lg:justify-end">
          <button className="bg-black text-white px-4 py-2 border-2 transition border-transparent  hover:text-black hover:bg-white hover:border-2 hover:border-slate-950 lg:mr-14">
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart