import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserGroupIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { productsReset } from "../../redux/admin/AdminSlice.js";
import { fetchAllProudcts, fetchOrders } from "../../redux/admin/AdminAsyncActions.js";
import { getAllUsers } from "../../redux/admin/AdminUserSlice.js";
import { numberWithCommas } from "../../utils/Utility.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

   const dispatch = useDispatch();

   const { error, products } = useSelector((state) => state.admin);

   const { orders } = useSelector((state) => state.adminOrder);

   const { users } = useSelector((state) => state.adminUsers);

   useEffect(() => {
     if (error) {
       toast.error(error);
       dispatch(productsReset());
     }

     dispatch(fetchAllProudcts());
     dispatch(getAllUsers());
     dispatch(fetchOrders());
   }, [dispatch, error]);

   // calculating product stock

   let outOfStock = 0;

   products && products.forEach((product) => {
          if(product.stock === 0){
            outOfStock += 1;
          }
   });

   // calculating total sales revenue
   
  let totalRevenue = 0;

  orders &&
    orders.forEach((order) => {
      if (order.paymentInfo.orderStatus === "Delivered") {
        totalRevenue += order.paymentInfo.totalPrice;
      }
    });

  const formattedTotalRevenue = totalRevenue.toFixed(2);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Revenue",
      },
    },
  };

  const data = {
    labels: ["Initial Revenue", "Revenue Generated"],
    datasets: [
      {
        label: "Total Sales Revenue",
        data: [0, totalRevenue],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Dummy data for product stock
  const doughnutData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [products.length - outOfStock, outOfStock], // You can update these values to represent your actual stock data
        backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Stock Status",
      },
    },
  };

  return (
    <div className="max-w-[1240px] my-8 mx-auto flex flex-col lg:flex-row">
      <Sidebar />

      <div className="bg-gray-100 lg:w-[calc(1240px-256px)]">
        <div className="mx-6 mt-6">
          <div>
            <Link>
              <h1 className="text-2xl font-semibold">My Dashboard</h1>
            </Link>
            <div className="mt-4">
              <p className="bg-green-300 p-4 text-center border border-gray-700">
                <span className="text-gray-800 text-lg">
                  Total Sales Revenue
                </span>{" "}
                <br /> <span className="font-medium text-xl">{"₹ " + numberWithCommas(formattedTotalRevenue)}</span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Link
                className=" bg-red-200 p-4 flex flex-col gap-2 items-center justify-center border border-gray-700"
                to="/admin/products"
              >
                <ShoppingBagIcon className="h-8 w-8" />
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link
                className=" bg-yellow-100 p-4 flex flex-col gap-2 items-center justify-center border border-gray-700"
                to="/admin/orders"
              >
                <ReceiptRefundIcon className="h-8 w-8" />
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link
                className="bg-slate-200 p-4 flex flex-col gap-2 items-center justify-center border border-gray-700"
                to="/admin/users"
              >
                <UserGroupIcon className="h-8 w-8" />
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <Line options={options} data={data} />
          </div>

          <div className="mt-6 p-3 flex items-center justify-center max-h-[400px] border border-black">
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
