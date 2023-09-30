import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="mt-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 max-w-[1240px] mx-auto">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Discover Your Perfect Style
        </h1>
        <p className=" text-xl first:lg:text-xl text-white mb-8">
          Explore our curated collection of fashion trends
        </p>
        <Link to={"/products"} className="flex justify-center space-x-4">
          <button className="bg-white text-red-600 border hover:text-black selection:hover:border-2 hover:border-black py-2 px-6 font-semibold text-lg transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero