import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getMyOrderDetails } from "../../redux/OrderDetailSlice";
import { updateOrderStatus } from "../../redux/admin/AdminAsyncActions";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./SideBar";
import { numberWithCommas } from "../../utils/Utility";
import { updateOrderReset } from "../../redux/admin/AdminOrderSlice";

function ManageOrder() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, order } = useSelector((state) => state.orderDetail);

  const { error: updationError, loading: updationLoading, isUpdated } = useSelector(
    (state) => state.adminOrder
  );
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updationError) {
      toast.error(updationError);
      dispatch(updateOrderReset());
    }

    if(isUpdated && isUpdated.success){
      toast.success('Order status updated successfully!')
      dispatch(updateOrderReset());
      navigate('/admin/orders')
    }

    // Ensure that order exists before trying to fetch details
    if (!order || (order && order._id !== id)) {
      dispatch(getMyOrderDetails(id));
    }
  }, [id, dispatch, error, updationError, order, isUpdated]);

  const address =
    order &&
    order.shippingInfo &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pincode}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`;

  const handleStatusChange = (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("orderStatus", newStatus);

    dispatch(updateOrderStatus(id, formData));
  };

  // Calculate the discounted price
  const discountedPrice = (item) => {
    return Math.floor(item.price - item.price * (item.discount / 100));
  };

  const orderStatusOptions = [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
    "Refunded",
    "On Hold",
    "Payment Pending",
    "Payment Failed",
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order - Details" />

          <div className="max-w-[1240px] my-8 mx-2 md:mx-auto flex flex-col lg:flex-row">
            <Sidebar />

            <div className="bg-gray-100 lg:w-[calc(1240px-256px)]">
              <div className="mt-6 lg:ml-6">
                <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                {order ? (
                  <>
                    <p className="text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200">
                      #Order ID: {order && order._id}
                    </p>
                    <p className="text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200">
                      Address: {address}
                    </p>
                    {order.paymentInfo ? (
                      <>
                        <p className="text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200">
                          Amount: ₹
                          {numberWithCommas(order.paymentInfo.totalPrice)}
                        </p>
                        <p className="text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200">
                          Payment Status: {order.paymentInfo.status}
                        </p>
                      </>
                    ) : null}
                    <p className="text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200">
                      Order Items: {order.orderItems && order.orderItems.length}
                    </p>
                    {order.paymentInfo ? (
                      <p
                        className={
                          order.paymentInfo.orderStatus === "Delivered"
                            ? "text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200 text-green-600"
                            : "text-lg font-medium mb-3 p-2 lg:mr-6 bg-gray-200 text-red-600 "
                        }
                      >
                        Current Status: {order.paymentInfo.orderStatus}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>

              <div className="mt-6 lg:ml-6">
                <p className="text-xl font-bold mb-6">Order Items:</p>
                <div>
                  { order.orderItems && order.orderItems.map((item) => (
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
                          <b>
                            {" ₹ " + numberWithCommas(discountedPrice(item))}
                          </b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div
                className={
                  order.paymentInfo &&
                  order.paymentInfo.orderStatus === "Delivered"
                    ? "hidden"
                    : "my-6 lg:ml-6"
                }
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Update Order Status
                </h2>
                <form onSubmit={handleStatusChange}>
                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="text-gray-600 block mb-2"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-9/12 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select Status</option>
                      {
                        orderStatusOptions.map((status, index) => (
                          <option value={status} key={index}>{status}</option>
                        ))
                      }
                    </select>
                  </div>

                  <button
                    disabled={newStatus === "" ? true : false}
                    type="submit"
                    className="bg-red-500 relative text-white px-8 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    {updationLoading ? (
                      <div
                        className="flex justify-center items-center"
                        role="status"
                      >
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Update"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ManageOrder;
