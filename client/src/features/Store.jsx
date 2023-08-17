import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice.jsx';


const store = configureStore({
  reducer: {
    products: productReducer
  }
});

export default store;