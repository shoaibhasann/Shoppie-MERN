import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../features/Userslice";
import Loader from "../Loader";
import { toast } from "react-toastify";

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
      dispatch(clearError());
    } else if(isAuthenticated){
      navigate('/account');
    }
  }, [error, dispatch, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-14">
          <div className=" p-8 shadow-2xl w-80 lg:w-[400px]">
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
                  className="w-full mt-1 p-2 border "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  type="password"
                  id="password"
                  name="password"
                  className="w-full mt-1 p-2 border "
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-950 text-white py-2 border-2 border-transparent  hover:text-slate-950 hover:bg-slate-100 hover:border-2 hover:border-slate-950"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link
                to={"/forgot-password"}
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
