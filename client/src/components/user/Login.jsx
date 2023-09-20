import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../redux/Userslice";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import MetaData from "../layout/MetaData";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      if (error && error.message === "Password is incorrect") {
        toast.error(error.message);
      }
      dispatch(clearError());
    } else if (isAuthenticated) {
      navigate(location.state?.from || "/");
    }
  }, [error, dispatch, isAuthenticated]);

  return (
    <>
      <MetaData title="Login - Shoppie" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-14">
          <div className=" p-8 shadow-2xl w-80 lg:w-[400px] rounded-sm border border-slate-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Sign In to continue
            </h2>
            <form onSubmit={submitHandler}>
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
                  className="w-full mt-1 p-2 pr-10 border border-slate-900 bg-white  "
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
                className="w-full bg-slate-950 text-white py-2 border-2 transition border-transparent  hover:text-slate-950 hover:bg-white hover:border-2 hover:border-slate-950"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link
                to={"/password/forgot"}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
