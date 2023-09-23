import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./ProductSlice";
import axios from "axios";
import { server } from "../main";

const adminSlice = createSlice({
  name: "adminSlice",

  initialState: {
    newProduct: {},
    products: [],
    loading: false,
    error: null,
    status: STATUSES.IDLE,
  },

  reducers: {
    // reducers function to manage products state
    productsRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    productsSuccess(state, action) {
      state.loading = false;
      state.status = STATUSES.SUCCESS;
      state.products = action.payload;
    },

    productsFail(state, action) {
      state.loading = false;
      state.status = STATUSES.FAIL;
      state.products = [];
      state.error = action.payload;
    },

    productsReset(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.error = null;
      state.products = [];
    },

    // reducers function to manage newProduct state

    newProductRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    newProductSuccess(state, action) {
      state.loading = true;
      state.status = STATUSES.SUCCESS;
      state.newProduct = action.payload;
    },

    newProductFail(state, action) {
      state.loading = false;
      state.status = STATUSES.FAIL;
      state.newProduct = {};
      state.error = action.payload;
    },

    newProductReset(state,action){
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.newProduct = {};
      state.error = null;
    },

    clearAdminErrors(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.newProduct = {};
      state.products = [];
      state.error = null;
    },
  },
});

// function to fetch all products with their details -- (Admin)
export function fetchAllProudcts() {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function fetchAllProductsThunk(dispatch,getState) {
    dispatch(productsRequest());

    try {
      const { data } = await axios.get(`${server}/products/admin`, config);
      dispatch(productsSuccess(data.products));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };
}

// function to create a new product --(Admin)
export function createProduct(productData){
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    return async function createProductThunk(dispatch,getState){
      dispatch(newProductRequest());
      try {
        const { data } = await axios.post(`${server}/products/admin`, productData, config);

        dispatch(newProductSuccess(data));

      } catch (error) {
        dispatch(newProductFail(error.response.data.message));
      }
    }
}

export const { productsRequest, productsSuccess, productsFail, productsReset, newProductRequest, newProductSuccess, newProductFail, newProductReset, clearAdminErrors } =
  adminSlice.actions;

export default adminSlice.reducer;
