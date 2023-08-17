import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { AiOutlineShoppingCart } from "react-icons/ai";

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: 20,
    value: 2.5,
    isHalf: true
}

function ProductCard({ product }) {
  return (
    <Link>
      <div className="flex flex-col gap-3 my-6 w-full max-w-[280px] hover:shadow-xl border border-slate-950">
        <img src={product.url} alt={product.name} />
        <p className="text-2xl font-bold mx-4">{product.name}</p>
        <div className="flex items-center gap-5 mx-4">
          <ReactStars {...options} /> <span>256 reviews</span>
        </div>
        <div className='flex items-center gap-5 mx-4 mb-4'>
          <span className="text-xl font-semibold">
            {product.price}
          </span>
          <button className='text-2xl px-4 py-2 text-[#222222]'><AiOutlineShoppingCart/></button>
        </div>
      </div>
    </Link>
  ); 
}

export default ProductCard;