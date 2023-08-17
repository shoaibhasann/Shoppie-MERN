import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const statuses = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});


const productSlice = createSlice({
    name: 'products',

    initialState: {
        data: [],
        status: statuses.IDLE
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

const server = "http://localhost:8080/api/v1";

export function fetchProducts(){

    return async function fetchProductsThunk(dispatch, getState){
        try {
            dispatch(setStatus(statuses.LOADING));

            const { data } = await axios.get(`${server}/products`);

            dispatch(setProducts(data));

            dispatch(setStatus(statuses.IDLE));

        } catch (error) {
            console.log(error);
            dispatch(setStatus(statuses.ERROR));
        }
    }
}

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;