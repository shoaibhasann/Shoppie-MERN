import React, { useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import MetaData from "../MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { AiFillCreditCard } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";

function PaymentForm() {

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const payBtn = useRef(null);

  const paymentSubmitHandler = () => {}


return (
  <>
    <MetaData title="Shoppie - Payment" />
    <CheckOutSteps activeStep={2} />
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg mb-6 lg:mb-10">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <form onSubmit={paymentSubmitHandler}>
        <div className="mb-4">
          <label className="block mb-2">Card Number</label>
          <div className="relative">
            <AiFillCreditCard className="absolute top-3 left-3 text-gray-400" />
            <CardNumberElement
              className="w-full p-3 pl-10 border  focus:outline-none focus:border-blue-500"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiration Date</label>
          <div className="relative">
            <BsFillCalendarEventFill className="absolute top-3 left-3 text-gray-400" />
            <CardExpiryElement
              className="w-full p-3 pl-10 border focus:outline-none focus:border-blue-500"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">CVC</label>
          <div className="relative">
            <MdVpnKey className="absolute top-3 left-3 text-gray-400" />
            <CardCvcElement
              className="w-full p-3 pl-10 border  focus:outline-none focus:border-blue-500"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center text-lg py-2 px-4 cursor-pointer transition bg-[#ed0010] p-4 text-white font-bold mt-5 w-full border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]"
        >
          Pay - {orderInfo && " ₹ " + orderInfo.totalPrice}
        </button>
      </form>
    </div>
  </>
);
}

export default PaymentForm;

