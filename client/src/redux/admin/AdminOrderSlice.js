import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../ProductSlice";


const adminOrderSlice = createSlice({
  name: "adminOrderSlice",

  initialState: {
    orders: [],
    loading: false,
    error: null,
    status: STATUSES.IDLE,
    isUpdated: false,
    isDeleted: false,
  },

  reducers: {
    // reducers function to get all orders
    allOrdersRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    allOrdersSuccess(state, action) {
      state.loading = false;
      state.status = STATUSES.SUCCESS;
      state.orders = action.payload;
    },

    allOrdersFail(state, action) {
      state.loading = false;
      state.status = STATUSES.FAIL;
      state.error = action.payload;
    },

    allOrdersReset(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.error = null;
      state.orders = [];
    },

    // reducers function to update order
    updateOrderRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    updateOrderSuccess(state, action) {
      state.loading = false;
      state.status = STATUSES.SUCCESS;
      state.isUpdated = action.payload;
    },

    updateOrderFail(state, action) {
      state.loading = false;
      state.status = STATUSES.FAIL;
      state.error = action.payload;
      state.isUpdated = false;
    },

    updateOrderReset(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.error = null;
      state.isUpdated = false;
    },

    // reducers function to delete order
    deleteOrderRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    deleteOrderSuccess(state, action) {
      state.loading = false;
      state.status = STATUSES.SUCCESS;
      state.isDeleted = action.payload;
    },

    deleteOrderFail(state, action) {
      state.loading = false;
      state.status = STATUSES.FAIL;
      state.error = action.payload;
      state.isDeleted = false;
    },

    deleteOrderReset(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.error = null;
      state.isDeleted = false;
    },
  },
});


export const { allOrdersRequest, allOrdersFail, allOrdersReset, allOrdersSuccess, updateOrderFail, updateOrderRequest, updateOrderReset, updateOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderReset, deleteOrderSuccess} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
