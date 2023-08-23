import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
        
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const submitHandler = (e) => {
          e.preventDefault();
        };

  return (
    <div className="flex justify-center items-center mt-14">
      <div className="bg-slate-100 p-8 shadow-md w-[320px] lg:w-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Sign Up to continue
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
            <Link to={"/login"} className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register