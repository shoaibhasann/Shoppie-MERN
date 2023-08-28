import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../../redux/Userslice";
import Loader from "../Loader";


function Register() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className=" p-8 shadow-2xl w-[320px] lg:w-[400px]">
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
                  className="w-full mt-1 p-2 border "
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
