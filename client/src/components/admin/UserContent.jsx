import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData.jsx";
import Sidebar from "./Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, updateUserFail, updateUserReset, updateUserRole } from "../../redux/admin/AdminUserSlice.js";

function UserContent() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id: userId } = useParams();

  const { user, isUpdated, error, loading } = useSelector((state) => state.adminUsers);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ""
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // create a formdata for product
    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("role", userData.role);

    try {
      dispatch(updateUserRole(userId, formData));
    } catch (error) {
      dispatch(updateUserFail(error));
    }
  };

  useEffect(() => {
    if(userId && (!user || user._id !== userId)){
      dispatch(getCurrentUser(userId));
    }

    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }

    if (isUpdated && isUpdated.success === true) {
      toast.success(isUpdated.message);
      dispatch(updateUserReset());
      navigate("/admin/dashboard");
    }

    if (error) {
      toast.error(error);
      dispatch(updateProductReset());
    }
  }, [error, dispatch, isUpdated, userId, user, loading, toast]);

  return (
    <>
      <MetaData title={`Update User Details - Admin`} />

      <div className="max-w-[1240px] m-8 mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <div className="bg-gray-100 p-4 rounded-md shadow-md lg:w-[calc(1240px-256px)]">
          <h1 className="text-2xl font-semibold mb-4">
            Update User Details
          </h1>
          <form
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-600 block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600 block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="text-gray-600 block mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
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
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserContent;
