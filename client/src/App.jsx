import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./redux/Userslice";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";




function App() {

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/update" element={<UpdateProfile />} />
        <Route exact path="/change-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
