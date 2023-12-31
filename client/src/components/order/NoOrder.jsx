import React from "react";
import NoOrderImage from "../../assets/search.png";
import { Link } from "react-router-dom";

function NoOrder(){

    return (
      <div className="flex lg:mt-10 my-10 bg-[#faf9f8] items-center flex-col justify-center lg:gap-7 gap-5">
        <img
          className="w-[250px]"
          src={NoOrderImage}
          alt="You don't have any orders."
        />
        <h4 className="text-2xl font-bold">No Orders Found</h4>
        <Link
          to={"/products"}
          className="flex items-center justify-center gap-4 text-xl transition bg-[#ed0010] px-4 py-2 text-white font-bold  border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]"
        >
          Shop now
        </Link>
      </div>
    );
}

export default NoOrder;