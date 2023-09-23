import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
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
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import MyOrder from "./components/order/MyOrder";
import OrderDetail from "./components/order/OrderDetail";
import OrderSuccess from "./components/cart/OrderSuccess";
import Dashboard from "./components/admin/Dashboard";
import ProductContent from "./components/admin/ProductContent";
import UserContent from "./components/admin/UserContent";
import OrderContent from "./components/admin/OrderContent";
import ProductListContent from "./components/admin/ProductListContent";



function App() {
  
  const dispatch = useDispatch();

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
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/account"
          element={<PrivateRoute component={Profile} />}
        />
        <Route
          exact
          path="/update"
          element={<PrivateRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<PrivateRoute component={UpdatePassword} />}
        />
        <Route
          exact
          path="/shipping"
          element={<PrivateRoute component={Shipping} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<PrivateRoute component={ConfirmOrder} />}
        />
        <Route
          exact
          path="/process/payment"
          element={<PrivateRoute component={Payment} />}
        />

        <Route
          exact
          path="/success"
          element={<PrivateRoute component={OrderSuccess} />}
        />

        <Route
          exact
          path="/orders"
          element={<PrivateRoute component={MyOrder} />}
        />

        <Route
          exact
          path="/orders/:id"
          element={<PrivateRoute component={OrderDetail} />}
        />

        <Route
          exact
          path="/admin/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />

        <Route
          exact
          path="/admin/products"
          element={<PrivateRoute component={ProductListContent} />}
        />

        <Route
          exact
          path="/admin/product"
          element={<PrivateRoute component={ProductContent} />}
        />

        <Route
          exact
          path="/admin/users"
          element={<PrivateRoute component={UserContent} />}
        />

        <Route
          exact
          path="/admin/orders"
          element={<PrivateRoute component={OrderContent} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
