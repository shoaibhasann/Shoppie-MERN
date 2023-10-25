import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../../redux/UserSlice.js";
import Loader from "../layout/Loader.jsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData.jsx";


function Register() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = user;

const submitHandler = async (e) => {
  e.preventDefault();

  dispatch(clearError());

  const userData = new FormData();

  userData.append("name", name);
  userData.append("email", email);
  userData.append("password", password);

  dispatch(register(userData));
};

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
      dispatch(clearError());
    } else if (isAuthenticated) {
      navigate("/account");
    }
  }, [error, dispatch, isAuthenticated]);


  return (
    <>
      <MetaData title="Register - Shoppie" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className=" p-8 shadow-2xl w-[320px] lg:w-[400px] rounded-sm border border-slate-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Welcome, to Sign Up
            </h2>
            <form encType="multipart/form-data" onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 p-2 pr-10 border border-slate-900 "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 p-2 pr-10 border border-slate-900"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block font-medium" htmlFor="oldPassword">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full mt-1 p-2 pr-10 border border-slate-900"
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 top-0 bottom-0 px-2 flex items-center bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-950 text-white py-2 border-2 border-transparent  hover:text-slate-950 hover:bg-slate-100 hover:border-2 hover:border-slate-950"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
