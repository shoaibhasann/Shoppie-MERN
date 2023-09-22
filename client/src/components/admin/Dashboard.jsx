import React, { useEffect } from "react";
import Sidebar from "./SideBar";
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
import { fetchAllProudcts, productsReset } from "../../redux/AdminSlice";

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

   useEffect(() => {
     if (error) {
       toast.error(error);
       dispatch(productsReset());
     }

     dispatch(fetchAllProudcts());
   }, [dispatch, error]);

   let outOfStock = 0;

   products && products.forEach((product) => {
          if(product.stock === 0){
            outOfStock += 1;
          }
   });


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
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Sales Revenue",
        data: [200, 400, 600, 800, 1000, 1200, 1400],
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
    <div className="max-w-[1240px] mt-8 mx-auto flex flex-col lg:flex-row">
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
                <br /> <span className="font-medium text-xl">₹2000</span>
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
                <p>50</p>
              </Link>
              <Link
                className="bg-slate-200 p-4 flex flex-col gap-2 items-center justify-center border border-gray-700"
                to="/admin/users"
              >
                <UserGroupIcon className="h-8 w-8" />
                <p>Users</p>
                <p>50</p>
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <Line options={options} data={data} />
          </div>

          <div className="mt-6 flex items-center justify-center max-h-[400px]">
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
