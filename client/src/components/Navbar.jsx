import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./user/UserOptions";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();


  const { isAuthenticated, userInfo } = useSelector((state) => state.user);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setSearchTerm(trimmedSearchTerm);
      navigate(`/products/${trimmedSearchTerm}`);
      setSearchOpen(false);
    }
  };

  const { cartItems }  = useSelector((state) => state.cart);

  return (
    <div className="flex border-b-2 border-gray justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-base lg:text-lg">
      <img className="w-36" src={Logo} alt="Logo" />
      <ul className="hidden md:flex items-center gap-4 cursor-pointer">
        <button onClick={toggleSearch} className="p-4">
          <AiOutlineSearch size={21} />
        </button>
        <Link to="/" className="p-4">
          Home
        </Link>
        <Link to="/products" className="p-4">
          Products
        </Link>
        <Link to="/cart" className="p-4">
          Shopping Bag ({cartItems.length})
        </Link>
        {!isAuthenticated && (
          <Link
            to="/login"
            className="w-28 h-9 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-white hover:border-2 hover:border-[#222222] hover:text-[#222222]"
          >
            Sign In
          </Link>
        )}
        {isAuthenticated && <UserOptions user={userInfo} />}
      </ul>
      <div
        className={
          searchOpen
            ? "absolute left-0 w-full px-4 lg:px-8 bg-white flex items-center"
            : "hidden"
        }
      >
        <form
          onSubmit={submitHandler}
          className="relative z-50 w-full lg:mx-5 flex items-center"
        >
          <input
            className="w-full border-b-2 border-slate-900 text-lg p-2"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            disabled={!searchTerm.trim()}
            type="submit"
            className="absolute right-16"
          >
            <AiOutlineSearch />
          </button>
          <button
            type="button"
            onClick={toggleSearch}
            className="absolute right-4"
          >
            <AiOutlineClose />
          </button>
        </form>
      </div>
      <div className="flex items-center gap-5 md:hidden">
        <button onClick={toggleSearch}>
          <AiOutlineSearch size={20} />
        </button>
        <div>{isAuthenticated && <UserOptions user={userInfo} />}</div>
        <div
          className="cursor-pointer z-30 block md:hidden"
          onClick={toggleNav}
        >
          {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>
      <div
        className={
          navOpen
            ? "fixed left-0 top-0 w-[100%] h-screen z-20 border-r border-r-gray-900 bg-white ease-in-out duration-2000 overflow-hidden"
            : "hidden"
        }
      >
        <img className="w-36 mt-9 ml-4" src={Logo} alt="Logo" />
        <div className="flex flex-col items-center justify-center p-4 gap-5 font-semibold cursor-pointer text-base lg:text-lg mt-16 overflow-hidden">
          <Link onClick={toggleNav} to="/" className="p-4">
            Home
          </Link>
          <Link onClick={toggleNav} to="/products" className="p-4">
            Products
          </Link>
          <Link onClick={toggleNav} to="/cart" className="p-4">
            Shopping Bag (0)
          </Link>
          {!isAuthenticated && (
            <Link
              onClick={toggleNav}
              to="/login"
              className="w-28 h-9 flex items-center justify-center font-medium bg-[#222222] text-[#fff] hover:bg-white hover:border-2 hover:border-[#222222] hover:text-[#222222]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
