import React from 'react'
import { Link } from 'react-router-dom';
import NotFoundImage from '../../assets/not-found.png'

function NotFound() {
  return (
    <div className="flex lg:mt-10 mt-7 bg-[#faf9f8] items-center flex-col justify-center gap-5">
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        className="w-[250px]"
      />
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <Link
        to="/"
        className="flex items-center justify-center text-xl transition bg-[#ed0010] px-4 py-2 text-white font-bold  border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound