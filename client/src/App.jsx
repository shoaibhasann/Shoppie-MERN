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
import PrivateRoute from "./utils/PrivateRoute";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";




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
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/account" element={<PrivateRoute authenticated={isAuthenticated} component={Profile}/>}/>
        <Route exact path="/update" element={<PrivateRoute authenticated={isAuthenticated} component={UpdateProfile}/>}/>
        <Route exact path="/password/update" element={<PrivateRoute authenticated={isAuthenticated} component={UpdatePassword}/>}/>
        <Route exact path="/shipping" element={<PrivateRoute authenticated={isAuthenticated} component={Shipping}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
