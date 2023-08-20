import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: "idle",
  FAIL: "error",
  LOADING: "loading",
  SUCCESS: "success"
});


const productSlice = createSlice({
    name: 'products',

    initialState: {
        data: [],
        status: STATUSES.IDLE
    },

    reducers: {
        setProducts(state,action){

            state.data = action.payload;
        },
        setStatus(state,action){
            state.status = action.payload;
        }
    }
});

const server = "http://localhost:8080/api/v1/products";

export function fetchProducts(){

    return async function fetchProductsThunk(dispatch, getState){

        dispatch(setStatus(STATUSES.LOADING));

        try {

            const { data } = await axios.get(`${server}`);

            dispatch(setProducts(data));

            dispatch(setStatus(STATUSES.SUCCESS));

        } catch (error) {
            console.log(error);
            return dispatch(setStatus(STATUSES.FAIL));
        }
    }
}

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;