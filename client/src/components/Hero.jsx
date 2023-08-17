import React from 'react'

function Hero() {
  return (
    <>
      <div className="bg-[#f4eddd] w-full h-[70vh] flex flex-col items-center justify-center gap-12">
        <p className="text-2xl md:text-4xl font-bold ">Welcome to Shoppie</p>
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Find Amazing Products Below
        </h1>
        <a href="#container">
          <button className=" text-[#fff] text-xl bg-[#222222] px-8 py-4 hover:bg-[#f4eddd] hover:border hover:border-[#222222] hover:text-[#222222]">
            Show Products
          </button>
        </a>
      </div>
    </>
  );
}

export default Hero