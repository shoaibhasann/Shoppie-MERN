import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice.jsx';
import productDetailReducer from "./productDetailSlice.jsx";
import userReducer from "./Userslice.jsx";


const store = configureStore({
  reducer: {

    products: productReducer,

    productDetail: productDetailReducer,

    user: userReducer
    
  }
});

export default store;