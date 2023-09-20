import React from "react";
import '../../styles/loader.css';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
