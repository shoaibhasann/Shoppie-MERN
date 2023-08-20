import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./productSlice";


const productDetailSlice = createSlice({
  name: "product",

  initialState: {
    data: {},
    status: STATUSES.IDLE,
  },

  reducers: {
    setProduct(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

const server = "http://localhost:8080/api/v1/products";

export function fetchProduct(id) {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {

      const { data } = await axios.get(`${server}/product/${id}`);

      dispatch(setProduct(data));

      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.FAIL));
    }
  };
}

export const { setProduct, setStatus } = productDetailSlice.actions;

export default productDetailSlice.reducer;
