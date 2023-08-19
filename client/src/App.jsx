import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/ProductDetail";
import ProductDetail from "./pages/ProductDetail";


function App() {

  return (

    
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
