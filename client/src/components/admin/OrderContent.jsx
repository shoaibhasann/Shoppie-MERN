import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.jsx";
import MetaData from "../layout/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import "../../styles/ProductListContent.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Loader from "../layout/Loader.jsx";
import { deleteOrder, fetchOrders } from "../../redux/admin/AdminAsyncActions.js";
import { allOrdersReset } from "../../redux/admin/AdminOrderSlice.js";
import { deleteProductReset } from "../../redux/admin/AdminSlice.js";


export const getStatusTextColor = (status) => {
      if (status === "Processing") {
        return "text-red-500";
      } else if (status === "Delivered") {
        return "text-green-500";
      } else if (status === "Shipped") {
        return "text-yellow-500";
      }
      return "";
    };


function OrderContent() {
  const dispatch = useDispatch();

  const { orders, error, loading, isUpdated, isDeleted } = useSelector((state) => state.adminOrder)

  useEffect(() => {

    if(error){
      toast.error(error);
      dispatch(allOrdersReset());
    }

    if(isDeleted){
      toast.success('Order deleted successfully!')
      dispatch(deleteProductReset());
    }

    dispatch(fetchOrders());
  }, [dispatch, toast, error, isDeleted]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="flex gap-3.5 items-center">
              <Link to={`/admin/order/${params.id}`}>
                <AiOutlineEdit className="text-lg lg:text-xl font-medium" />
              </Link>

              <Button onClick={() => handleDelete(params.id)} className="p-1.3">
                <AiOutlineDelete className="text-lg lg:text-xl font-medium" />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

const rows = [];

orders &&
  orders.forEach((order) => {
    rows.push({
      id: order._id, // Use a unique identifier for each row (e.g., order._id)
      status: order.paymentInfo?.orderStatus,
      itemQty: order.orderItems?.length,
      amount: "₹ " + order.paymentInfo?.totalPrice,
    });
  });


  return (
    <>
      <MetaData title={`All Orders - Admin`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1240px] mt-8 mx-auto flex flex-col lg:flex-row">
          <Sidebar />
          <div className="bg-gray-100 lg:max-w-[calc(1240px-256px)]">
            <div className="m-6">
              <h1 className="text-2xl font-semibold mb-4">ALL ORDERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderContent;
