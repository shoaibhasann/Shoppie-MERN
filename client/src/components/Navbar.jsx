import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className=" flex border-b-2 border-gray justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-base lg:text-lg">
      <img className="w-36" src={Logo} alt="Logo" />
      <ul className=" hidden md:flex items-center cursor-pointer">
        <Link to={"/"} className="p-4">
          Home
        </Link>
        <Link to={"/product"} className="p-4">
          Product
        </Link>
        <Link to={"/account"} className="p-4">
          Account
        </Link>
        <Link to={"/cart"} className="p-4">
          Shopping Bag (0)
        </Link>

        <Link
          to={"/login"}
          className="w-28 h-9 ml-4 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-[#faf9f8] hover:border hover:border-[#222222] hover:text-[#222222]"
        >
          Sign In
        </Link>
      </ul>
      <div className="cursor-pointer z-10 block md:hidden" onClick={handleNav}>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[100%] h-full border-r border-r-gray-900 bg-[#faf9f8] ease-in-out duration-800"
            : "hidden"
        }
      >
        <img className="w-36 mt-9 ml-4" src={Logo} alt="Logo" />
        <div className=" flex flex-col items-center justify-center p-4 gap-5 font-semibold cursor-pointer text-base lg:text-lg">
          <Link to={"/"} className="p-4">
            Home
          </Link>
          <Link to={"/product"} className="p-4">
            Product
          </Link>
          <Link to={"/account"} className="p-4">
            Account
          </Link>
          <Link to={"/cart"} className="p-4">
            Shopping Bag (0)
          </Link>
          <Link
            to={"/login"}
            className="w-28 h-9 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-[#faf9f8] hover:border hover:border-[#222222] hover:text-[#222222]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
