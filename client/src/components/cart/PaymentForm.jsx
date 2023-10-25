import React, { useEffect, useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import MetaData from "../layout/MetaData.jsx";
import CheckOutSteps from "./CheckOutSteps.jsx";
import { AiFillCreditCard } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main.jsx";
import { toast } from "react-toastify";
import { clearErrors, createNewOrder } from "../../redux/OrderSlice.js";

function PaymentForm() {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const stripe = useStripe();

  const elements = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const {  error, loading, } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  const order = {
    shippingInfo,
    orderItems: cartItems,
  }

  const paymentData = {
    amount: orderInfo.totalPrice * 100,
  };

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();

    // disabled pay button
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userInfo.name,
            email: userInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.pincode,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {

          if (result.paymentIntent.status === "succeeded") {

            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
              itemsPrice: orderInfo.subtotal,
              taxPrice: orderInfo.tax,
              shippingPrice: orderInfo.shippingCharges,
              totalPrice: orderInfo.totalPrice,
            };
           
            dispatch(createNewOrder(order));

          navigate("/success");

        } else if (result.paymentIntent.status === "canceled") {
          toast.warning(
            "Oops! Payment failed. Please check your card information and try again."
          );
          
        } else {
          toast.error(
            "Sorry, there was a problem on our end. Our team has been notified. Please try again later."
          );
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

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
            ref={payBtn}
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
