import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { clearErrors, getMyOrders } from "../../redux/MyOrderSlice";
import { Link } from "react-router-dom";
import { BiLinkExternal } from 'react-icons/bi';
import './MyOrder.css'


function MyOrder() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.myOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    } 

    dispatch(getMyOrders());

  }, [dispatch, error]);

  const { userInfo } = useSelector((state) => state.user);

const getStatusTextColor = (status) => {
  if (status === "Processing") {
    return "text-red-500"; // Use your desired Tailwind CSS class for red text color
  } else if (status === "Delivered") {
    return "text-green-500"; // Use your desired Tailwind CSS class for green text color
  }
  // Return a default class or empty string for other statuses
  return "";
};


  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 300 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) => {
        const status = params.value;
        const textColorClass = getStatusTextColor(status);
        return (
          <span className={`text-base font-medium ${textColorClass}`}>
            {status || ""}
          </span>
        );
      },
    },
    {
      field: "itemQty",
      headerName: "Items Quantity",
      type: Number,
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: Number,
      flex: 0.5,
      minWidth: 270,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: Number,
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Link to={`/orders/${row.id}`}>
            <BiLinkExternal className="text-xl lg:text-2xl font-medium" />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  if(orders && orders.length > 0){
    orders.forEach((order) => {
        rows.push({
          id: order._id,
          status: order.paymentInfo?.orderStatus,
          itemQty: order.orderItems?.length,
          amount: order.paymentInfo?.totalPrice,
        });
    })
  }

  const headerRowClasses = "bg-blue-500 text-white"; 

  return (
    <>
      <MetaData title={`${userInfo.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage max-w-[1240px] lg:mx-auto mt-6 mx-3 lg:mt-8 bg-white">
          {rows.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              <DataGrid
                className="myOrdersTable"
                rows={rows}
                columns={columns}
                pageSize={10}
                headerClassName="custom-header-row"
              />
              <p className="myOrdersHeading marker:bg-gray-900 text-white p-4 text-center font-semibold tracking-wide text-xl">{`${userInfo.name}'s Orders`}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MyOrder;
