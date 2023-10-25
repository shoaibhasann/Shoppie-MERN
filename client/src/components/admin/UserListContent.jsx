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
import { deleteUser, deleteUserReset, getAllUsers } from "../../redux/admin/AdminUserSlice.js";

const getRoleTextColor = (status) => {
  if (status === "User") {
    return "text-red-500";
  } else if (status === "Admin") {
    return "text-green-500";
  }
  return "";
};

function UserListContent() {

  const dispatch = useDispatch();

  const { users, error, loading, isDeleted } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    if (error) {
      toast.error(error);  
      dispatch(deleteProductReset());
    }

    if (isDeleted.success === true) {
      toast.success(isDeleted.message);
      dispatch(deleteUserReset());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, toast, isDeleted]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => {
        const role = params.value;
        const textColorClass = getRoleTextColor(role);
        return (
          <span className={`text-base font-medium ${textColorClass}`}>
            {role || ""}
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
            <div className="flex gap-3.5 items-center">
              <Link to={`/admin/user/${params.id}`}>
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

  users && users.forEach((user) => {
     rows.push({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
     })
  })

  

  return (
    <>
      <MetaData title={`All Users - Admin`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1240px] mt-8 mx-auto flex flex-col lg:flex-row">
          <Sidebar />
          <div className="bg-gray-100 lg:max-w-[calc(1240px-256px)]">
            <div className="m-6">
              <h1 className="text-2xl font-semibold mb-4">ALL Users</h1>

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

export default UserListContent;
