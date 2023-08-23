import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#ed0010] border-opacity-80"></div>
    </div>
  );
}

export default Loader;
