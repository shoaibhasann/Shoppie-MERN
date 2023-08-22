import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const [search, setSearch] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm((searchTerm) => searchTerm.trim());
    navigate(`/products/${searchTerm}`);
    setSearch(false);
  };

  return (
    <div className="flex border-b-2 border-gray justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-base lg:text-lg">
      <img className="w-36" src={Logo} alt="Logo" />
      <ul className=" hidden md:flex items-center cursor-pointer">
        <button onClick={() => setSearch(true)} className="p-4">
          <AiOutlineSearch size={21} />
        </button>
        <div
          className={
            search
              ? "absolute left-0 w-full px-8 bg-[#faf9f8] flex items-center duration-200 ease-in-out"
              : "hidden"
          }
        >
          <form
            onSubmit={submitHandler}
            className="relative w-full flex items-center"
          >
            <input
              className="w-full p-2 text-lg   focus:ring-[#e50010]"
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-16">
              <AiOutlineSearch />
            </button>
            <button
              onClick={() => setSearch(!search)}
              className="absolute right-4"
            >
              <AiOutlineClose />
            </button>
          </form>
        </div>
        <Link to={"/"} className="p-4">
          Home
        </Link>
        <Link to={"/products"} className="p-4">
          Products
        </Link>
        <Link to={"/account"} className="p-4">
          Account
        </Link>
        <Link to={"/cart"} className="p-4">
          Shopping Bag (0)
        </Link>

        <Link
          to={"/login"}
          className="w-28 h-9 ml-4 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-[#faf9f8] hover:border-2 hover:border-[#222222] hover:text-[#222222]"
        >
          Sign In
        </Link>
      </ul>
      <div
        className={
          search
            ? " z-50 absolute left-0 w-full px-4 lg:px-8 bg-[#faf9f8] flex items-center"
            : "hidden"
        }
      >
        <form
          onSubmit={submitHandler}
          className="relative w-full flex items-center"
        >
          <input
            className="w-full border text-lg p-2 rounded"
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-16">
            <AiOutlineSearch />
          </button>
          <button
            onClick={() => setSearch(!search)}
            className="absolute right-4"
          >
            <AiOutlineClose />
          </button>
        </form>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <button onClick={() => setSearch(true)} className="p-4">
          <AiOutlineSearch size={20} />
        </button>
        <div
          className="cursor-pointer z-30 block md:hidden"
          onClick={handleNav}
        >
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[100%] h-full z-20 border-r border-r-gray-900 bg-[#faf9f8] ease-in-out duration-2000"
            : "hidden"
        }
      >
        <img className="w-36 mt-9 ml-4" src={Logo} alt="Logo" />
        <div className=" flex flex-col items-center justify-center p-4 gap-5 font-semibold cursor-pointer text-base lg:text-lg">
          <Link onClick={() => setNav(true)} to={"/"} className="p-4">
            Home
          </Link>
          <Link onClick={() => setNav(true)} to={"/products"} className="p-4">
            Products
          </Link>
          <Link onClick={() => setNav(true)} to={"/account"} className="p-4">
            Account
          </Link>
          <Link onClick={() => setNav(true)} to={"/cart"} className="p-4">
            Shopping Bag (0)
          </Link>
          <Link
            onClick={() => setNav(true)}
            to={"/login"}
            className="w-28 h-9 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-[#faf9f8] hover:border-2 hover:border-[#222222] hover:text-[#222222]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
