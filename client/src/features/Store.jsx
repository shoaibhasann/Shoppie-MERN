import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice.jsx';
import productDetailReducer from "./productDetailSlice.jsx";


const store = configureStore({
  reducer: {

    products: productReducer,

    productDetail: productDetailReducer,
    
  }
});

export default store;