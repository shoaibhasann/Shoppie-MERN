import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-[#f4eddd] mt-14 max-w-[1240px] h-[70vh] mx-auto flex flex-col items-center justify-center gap-12">
      <p className="text-2xl md:text-4xl font-bold ">Welcome to Shoppie</p>
      <h1 className="text-3xl md:text-5xl font-extrabold">
        Find Amazing Products Below
      </h1>
      <div>
        <Link to={'/products'}>
          <button className="text-[#fff] text-xl bg-[#222222] px-8 py-4 border-2 border-transparent hover:border-[#222222] hover:bg-[#f4eddd] hover:text-[#222222] transition">
            Explore Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero