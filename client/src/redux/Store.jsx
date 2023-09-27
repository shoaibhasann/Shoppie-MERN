import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice.jsx';
import productDetailReducer from "./productDetailSlice.jsx";
import userReducer from './UserSlice.jsx';
import profileReducer from './ProfileSlice.jsx';
import forgotPasswordReducer from './ForgotPasswordSlice.jsx';
import resetPasswordReducer from './ResetPasswordSlice.jsx';
import cartReducer from './CartSlice.jsx';
import newOrderReducer from './OrderSlice.jsx';
import myOrderReducer from './MyOrderSlice.jsx';
import orderDetailReducer from './OrderDetailSlice.jsx';
import newReviewReducer from './ReviewSlice.jsx';
import adminReducer from './admin/AdminSlice.jsx';
import adminOrderReducer from './admin/AdminOrderSlice.jsx';
import adminUsersReducer from './admin/AdminUserSlice.jsx';


const store = configureStore({
  reducer: {

    products: productReducer,

    productDetail: productDetailReducer,

    user: userReducer,

    profile: profileReducer,

    forgotPassword: forgotPasswordReducer,

    resetPassword: resetPasswordReducer,

    cart: cartReducer,

    newOrder: newOrderReducer,

    myOrder:  myOrderReducer,

    orderDetail: orderDetailReducer,

    newReview: newReviewReducer,

    admin: adminReducer,

    adminOrder: adminOrderReducer,

    adminUsers: adminUsersReducer,
    
  }
});

export default store;