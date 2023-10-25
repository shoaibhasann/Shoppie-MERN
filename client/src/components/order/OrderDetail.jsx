import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getMyOrderDetails } from "../../redux/OrderDetailSlice.js";
import MetaData from "../layout/MetaData.jsx";
import Loader from "../layout/Loader.jsx";
import { numberWithCommas } from "../../utils/Utility.js";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.orderDetail);

  const address =
    order.shippingInfo &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pincode}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getMyOrderDetails(id));
  }, [id, dispatch]);

  // Calculate the discounted price
  const discountedPrice = (item) => {
    return Math.floor(item.price - item.price * (item.discount / 100));
  };

  return (
    <>
      <MetaData title="Order - Details" />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1240px] mx-4 lg:mx-auto lg:mt-10 mt-7">
          <h1 className="text-xl lg:text-2xl font-bold mb-3 p-4 bg-red-100 text-red-500">
            #Order ID:  {order && order._id}
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mt-5 lg:mt-8">
            <div>
              <p className="text-2xl font-semibold mb-3">Shipping Info</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-100 p-4 ">
                  {" "}
                  {/* Different background color */}
                  <p className="text-lg font-semibold">Name:</p>
                  <span className="text-gray-700 font-medium">
                    {order.user && order.user.name}
                  </span>
                </div>
                <div className="bg-green-100 p-4 ">
                  {" "}
                  {/* Different background color */}
                  <p className="text-lg font-semibold">Phone No:</p>
                  <span className="text-gray-700 font-medium">
                    {order.shippingInfo && order.shippingInfo.phone}
                  </span>
                </div>
                <div className="bg-yellow-100 p-4">
                  {" "}
                  {/* Different background color */}
                  <p className="text-lg font-semibold">Address:</p>
                  <span
                    className="text-gray-700 font-medium w-64 break-all"
                    title={address}
                  >
                    {address}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-2xl font-semibold my-3">Payment Info</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-100 p-4 ">
                  {" "}
                  {/* Different background color */}
                  <p className="text-lg font-semibold">
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "Not PAID"}
                  </p>
                </div>
                <div className="bg-green-100 p-4 ">
                  <p className="text-lg font-semibold">Amount:</p>
                  <span className="text-gray-700 font-medium">
                    {order.paymentInfo &&
                      " ₹ " + numberWithCommas(order.paymentInfo.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-2xl font-semibold my-3">Order Status</p>
              <div className="bg-yellow-100 p-4 ">
                <span className="text-gray-900 text-lg font-semibold">
                  {order.paymentInfo && order.paymentInfo.orderStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="my-6">
            <p className="text-2xl font-semibold mb-4">Order Items:</p>
            <div>
              {order.orderItems &&
                order.orderItems.map((item) => (
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
      )}
    </>
  );
}

export default OrderDetail;
