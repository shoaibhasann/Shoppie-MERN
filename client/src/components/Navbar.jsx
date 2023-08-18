import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className=" flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
      <img className="w-36" src={Logo} alt="Logo" />
      <ul className=" hidden md:flex items-center cursor-pointer">
        <li className="p-4">Home</li>
        <li className="p-4">Product</li>
        <li className="p-4">Account</li>
        <li className="p-4">Shopping Bag (0)</li>
        
        <button className="w-28 h-9 ml-4 text-center rounded font-medium bg-[#222222] text-[#fff] hover:bg-[#faf9f8] hover:border hover:border-[#222222] hover:text-[#222222]">
          Sign In
        </button>
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
        <ul className="p-4 uppercase font-semibold cursor-pointer">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Product</li>
          <li className="p-4 border-b border-gray-600">Account</li>
          <li className="p-4 border-b border-gray-600">Shopping Bag</li>
          <li className="p-4">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
