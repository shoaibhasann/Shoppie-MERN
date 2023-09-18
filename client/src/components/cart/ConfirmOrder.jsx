import React from 'react'
import MetaData from '../MetaData'
import CheckOutSteps from './CheckOutSteps'
import { useSelector } from 'react-redux'
import { numberWithCommas } from '../../utils/Utility';
import { Link, useNavigate } from 'react-router-dom';

function ConfirmOrder() {

    const navigate = useNavigate();

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);

    const { userInfo } = useSelector((state) => state.user);

      // Calculate the discounted price
    const discountedPrice = (item) => {
       return Math.floor(item.price - item.price * (item.discount / 100));
    }

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}, ${shippingInfo.state}, ${shippingInfo.country}`;

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * discountedPrice(item), 0
    );

    const shippingCharges = subtotal > 2000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = Math.round(subtotal + tax + shippingCharges);

    const formattedTotalPrice = numberWithCommas(totalPrice.toFixed(2));

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment');
    }



  return (
    <>
      <MetaData title="Shoppie - Confirm Order" />
      <CheckOutSteps activeStep={1} />

      <div className="max-w-[1240px] grid grid-cols-1 lg:grid-cols-[6fr_3fr] mx-auto mb-7 lg:mb-10">
        {/* shipping Info  */}

        <div className="pl-4 lg:pl-12">
          <div className="mb-6">
            <p className="text-2xl font-semibold mb-3">Shipping Info</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <p className="text-lg">Name:</p>
                <span className="text-gray-700 font-medium text-base">
                  {userInfo.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg">Phone No:</p>
                <span className="text-gray-700 font-medium text-base">
                  {shippingInfo.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg">Address:</p>
                <span className="text-gray-700 font-medium text-base">
                  {address}
                </span>
              </div>
            </div>
          </div>

          {/* cart items  */}

          <div>
            <p className="text-xl font-bold mb-6">Your cart items:</p>
            <div>
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    className="grid grid-cols-2 place-items-center max-w-3xl max-h-25 mb-6"
                    key={item.productId}
                  >
                    <div className="flex flex-col gap-2 items-center lg:flex-row">
                      <img
                        className="w-[80px] lg:w-[140px]"
                        src={item.image.secure_url}
                        alt={item.name}
                      />
                      <Link
                        className="font-medium text-base lg:text-lg leading-5 hover:underline"
                        to={`/product/${item.productId}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <span className="flex items-center gap-2">
                      {item.quantity} X{" "}
                      {"₹ " + numberWithCommas(discountedPrice(item))} ={" "}
                      <b>{" ₹ " + numberWithCommas(discountedPrice(item))}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/*  order summary */}
        <div className="border-t flex flex-col items-center pt-4 lg:border-t-0 lg:border-l border-gray-500 lg:pl-12 mx-auto">
          <p className="text-xl font-bold mb-6">Order Summary</p>
          <div>
            <div className="flex items-center gap-3">
              <p className="text-lg">Subtotal:</p>
              <span className="text-gray-700 font-medium text-base">
                {"₹ " + subtotal}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg">Shipping Charges:</p>
              <span className="text-gray-700 font-medium text-base">
                {"₹ " + shippingCharges}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg">GST:</p>
              <span className="text-gray-700 font-medium text-base">
                {"₹ " + tax}
              </span>
            </div>

            <div className="flex items-center gap-3 my-6 border-t border-gray-500 pt-3">
              <p className="text-xl font-semibold">Total:</p>
              <span className="text-gray-700 font-semibold text-lg">
                {"₹ " + formattedTotalPrice}
              </span>
            </div>
            <button onClick={proceedToPayment} className="bg-black text-white px-4 py-2 border-2 transition border-transparent  hover:text-black hover:bg-white hover:border-2 hover:border-slate-950">
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder