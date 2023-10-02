import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice.js';
import productDetailReducer from '../ProductDetailSlice.js';
import userReducer from '../UserSlice.js';
import profileReducer from '../ProfileSlice.js';
import forgotPasswordReducer from '../ForgotPasswordSlice.js';
import resetPasswordReducer from '../ForgotPasswordSlice.js';
import cartReducer from '../CartSlice.js';
import newOrderReducer from '../OrderSlice.js';
import myOrderReducer from '../MyOrderSlice.js';
import orderDetailReducer from '../OrderDetailSlice.js';
import newReviewReducer from '../ReviewSlice.js';
import adminReducer from '../admin/AdminSlice.js';
import adminOrderReducer from '../admin/AdminOrderSlice.js';
import adminUsersReducer from '../admin/AdminUserSlice.js';
import adminReviewReducer from '../admin/AdminReviewSlice.js';


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

    myOrder: myOrderReducer,

    orderDetail: orderDetailReducer,

    newReview: newReviewReducer,

    admin: adminReducer,

    adminOrder: adminOrderReducer,

    adminUsers: adminUsersReducer,

    adminReviews: adminReviewReducer,
  },
});

export default store;
