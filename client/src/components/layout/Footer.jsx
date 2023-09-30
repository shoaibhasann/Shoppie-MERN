import React from 'react';
import Logo from "../../assets/logo.png";
import { FaGithub, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full mt-12 flex flex-col lg:grid lg:grid-rows-[4fr_1fr] bg-black text-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 px-6 py-8 lg:p-8">
        <div className="flex flex-col items-start justify-center gap-5">
          <img className="w-24" src={Logo} alt="Logo" />
          <p className="text-gray-300">
            Embark on a seamless online shopping journey with Shoppie! Discover,
            shop, and experience convenience like never before. Welcome to
            Shoppie!
          </p>
          <ul className="flex items-center gap-3 text-gray-300 text-xl">
            <li>
              <a
                className="hover:text-red-500"
                href="https://twitter.com"
                target="_blank"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                className="hover:text-red-500"
                href="https://www.instagram.com/shoaib.hasann/"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                className="hover:text-red-500"
                href="https://github.com/shoaibhasann"
                target="_blank"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                className="hover:text-red-500"
                href="https://www.linkedin.com/in/mohd-shoaib-ansari-2a0b16230/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-white text-xl mb-3">Address</h1>
          <div className="flex flex-col items-start justify-center gap-5 text-gray-300">
            <p className="flex items-center gap-2">
              <MdLocationPin /> Vikaspuri, New Delhi, India
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +917818906577
            </p>
            <p className="flex items-center gap-2">
              <MdEmail /> shoaibhasan0940@gmail.com
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-white text-xl mb-3">Quick as</h1>
          <ul className="flex flex-col items-start justify-center gap-3 text-gray-300">
            <li className="hover:underline hover:text-red-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:underline hover:text-red-500">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="hover:underline hover:text-red-500">
              <Link to='/services'>Our Services</Link>
            </li>
            <li className="hover:underline hover:text-red-500">
              <Link to='/terms'>Terms & Condition</Link>
            </li>
            <li className="hover:underline hover:text-red-500">
              <Link to='/support'>Support</Link>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800  p-6 rounded-lg shadow-lg">
          <h1 className="text-white text-xl">Newsletter</h1>
          <div className="mt-4">
            <p className="text-gray-300">
              Subscribe to our newsletter and stay updated.
            </p>
          </div>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md w-3/4 bg-gray-700 text-white focus:outline-none focus:ring-none focus:border-red-300"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-r-md focus:outline-none focus:ring-none focus:border-red-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border border-transparent border-t-gray-300 flex items-center justify-center">
        <div className="flex flex-col items-center py-1">
          <p className="tracking-wide">Made By ❤️ Shoaib.</p>
          <p className="text-xs text-gray-500 tracking-widest">
            {" "}
            <span>&copy;</span> All Rights Reserverd.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer