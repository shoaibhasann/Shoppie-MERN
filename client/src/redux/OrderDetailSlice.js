import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./ProductSlice";
import axios from "axios";
import { server } from "../main";

const orderDetailSlice = createSlice({
  name: "orderDetail",

  initialState: {
    order: {},
    status: STATUSES.IDLE,
    loading: false,
    error: null,
  },

  reducers: {
    orderDetailRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    orderDetailSuccess(state, action) {
        state.loading = false,
        state.status = STATUSES.SUCCESS,
        state.order = action.payload
    },

    orderDetailFail(state, action) {
      state.loading = true;
      state.status = STATUSES.FAIL;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.order = {};
      state.error = null;
    },
  },
});

export function getMyOrderDetails(id) {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  return async function getMyOrdersDetailsThunk(dispatch, getState) {
    dispatch(orderDetailRequest());

    try {
      const { data } = await axios.get(`${server}/orders/${id}`, config);

      dispatch(orderDetailSuccess(data.order));
    } catch (error) {
      dispatch(orderDetailFail(error.response.data.message));
    }
  };
}

export const { orderDetailRequest, orderDetailSuccess, orderDetailFail, clearErrors } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
