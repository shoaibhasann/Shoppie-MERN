import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./ProductSlice";
import axios from "axios";
import { server } from "../main";

const myOrderSlice = createSlice({
  name: "myOrder",

  initialState: {
    orders: [],
    status: STATUSES.IDLE,
    loading: false,
    error: null,
  },

  reducers: {
    myOrderRequest(state, action) {
      state.loading = true;
      state.status = STATUSES.LOADING;
    },

    myOrderSuccess(state, action) {
        return {
          ...state,
          loading: false,
          status: STATUSES.SUCCESS,
          orders: action.payload
        }
    },

    myOrderFail(state, action) {
      state.loading = true;
      state.status = STATUSES.FAIL;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.loading = false;
      state.status = STATUSES.IDLE;
      state.orders = [];
      state.error = null;
    },
  },
});

export function getMyOrders() {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  return async function getMyOrdersThunk(dispatch, getState) {
    dispatch(myOrderRequest());

    try {
      const { data } = await axios.get(
        `${server}/orders/my-orders`,
        config
      );

      dispatch(myOrderSuccess(data.orders));
    } catch (error) {
      console.log(error);
      dispatch(myOrderFail(error.response.data.message));
    }
  };
}

export const {
  myOrderRequest,
  myOrderSuccess,
  myOrderFail,
  clearErrors,
} = myOrderSlice.actions;

export default myOrderSlice.reducer;
