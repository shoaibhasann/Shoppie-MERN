import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../ProductSlice";


const adminSlice = createSlice({
  name: "adminSlice",

  initialState: {
    productDeletion: {
      loading: false,
      error: null,
      status: STATUSES.IDLE,
      isDeleted: false,
    },
    productUpdation: {
      loading: false,
      error: null,
      status: STATUSES.IDLE,
      isUpdated: false,
    },
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

    newProductReset(state, action) {
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

    // reducers function to delete product
    deleteProductRequest(state, action) {
      const { productDeletion } = state;

      productDeletion.loading = true;
      productDeletion.status = STATUSES.LOADING;
    },

    deleteProductSuccess(state, action) {
      const { productDeletion } = state;

      productDeletion.loading = false;
      productDeletion.status = STATUSES.SUCCESS;
      productDeletion.isDeleted = true;
    },

    deleteProductFail(state, action) {
      const { productDeletion } = state;

      productDeletion.error = action.payload;
      productDeletion.status = STATUSES.FAIL;
      productDeletion.loading = false;
    },

    deleteProductReset(state, action) {
      const { productDeletion } = state;

      productDeletion.loading = false;
      productDeletion.status = STATUSES.IDLE;
      productDeletion.isDeleted = false;
      productDeletion.error = null;
    },

    // reducers function to update product

    updateProductRequest(state, action) {

      const { productUpdation } = state;

      productUpdation.loading = true;
      productUpdation.status = STATUSES.LOADING;
    },

    updateProductSuccess(state, action) {
      const { productUpdation } = state;

      productUpdation.loading = false;
      productUpdation.status = STATUSES.SUCCESS;
      productUpdation.isUpdated = action.payload;
    },

    updateProductFail(state, action) {
      const { productUpdation } = state;

      productUpdation.loading = false;
      productUpdation.status = STATUSES.FAIL;
      productUpdation.error = action.payload;
      productUpdation.isUpdated = false;
    },

    updateProductReset(state,action){
      const { productUpdation } = state;

      productUpdation.loading = false;
      productUpdation.status = STATUSES.IDLE;
      productUpdation.error = null;
      productUpdation.isUpdated = false;
    }
  },
});


export const {
  productsRequest,
  productsSuccess,
  productsFail,
  productsReset,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
  clearAdminErrors,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductReset,
  updateProductFail,
  updateProductRequest,
  updateProductReset,
  updateProductSuccess
} = adminSlice.actions;

export default adminSlice.reducer;
