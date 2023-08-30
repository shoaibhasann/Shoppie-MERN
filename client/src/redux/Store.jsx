import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice.jsx';
import productDetailReducer from "./productDetailSlice.jsx";
import userReducer from './UserSlice.jsx';
import profileReducer from './ProfileSlice.jsx'


const store = configureStore({
  reducer: {

    products: productReducer,

    productDetail: productDetailReducer,

    user: userReducer,

    profile: profileReducer
    
  }
});

export default store;