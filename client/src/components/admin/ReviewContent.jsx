import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.jsx";
import MetaData from "../layout/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import "../../styles/ProductListContent.css";
import { AiOutlineDelete } from "react-icons/ai";
import { clearErrors, deleteReview, deleteReviewReset, fetchAllReviews } from "../../redux/admin/AdminReviewSlice.js";


function ReviewContent() {

  const dispatch = useDispatch();

  const { reviews, error, loading, isDeleted } = useSelector(
    (state) => state.adminReviews
  );

  const [productId, setProductId] = useState("");

  useEffect(() => {

    if(productId.length === 24){
        dispatch(fetchAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted.success === true) {
      toast.success(isDeleted.message);
      dispatch(deleteReviewReset());
    }
  }, [dispatch, productId, error, toast, isDeleted]);

  const handleDelete = (reviewId, productId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     try {
        
     } catch (error) {
        
     }
  }

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 250, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 0.5,
    },

    {
      field: "comment",
      headerName: "comment",
      minWidth: 400,
      flex: 1,
    },

    {
      field: "ratings",
      headerName: "Ratings",
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        const ratings = params.value;
        return (
          <span
            className={
              ratings > 3
                ? "text-base font-medium text-green-500"
                : "text-base font-medium text-green-500"
            }
          >
            {ratings || ""}
          </span>
        );
      },
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
              <Button onClick={() => handleDelete(params.id, productId)} className="p-1.3">
                <AiOutlineDelete className="text-lg lg:text-xl font-medium" />
              </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        ratings: review.rating
      });
    });

  return (
    <>
      <MetaData title={`All Reviews - Admin`} />
      <div className="max-w-[1240px] mt-8 mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <div className="bg-gray-100 lg:w-[calc(1240px-256px)]">
          <div className="m-6">
            <h1 className="text-2xl font-semibold mb-4">All Reviews</h1>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="productId" className="text-gray-600 block mb-2">
                  Product ID
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-red-500 relative text-white px-8 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                {loading ? (
                  <div className="flex justify-center" role="status">
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
                  "Find Reviews"
                )}
              </button>
            </form>
          </div>
          {reviews && reviews.length > 0 ? (
            <div className="m-6">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          ) : (
            <h2 className="text-center text-2xl font-medium">No Reviews Found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewContent;
