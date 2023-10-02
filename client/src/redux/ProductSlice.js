import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { server } from "../main";

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
        status: STATUSES.IDLE,
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


export function fetchProducts(keyword='', currentPage=1, price=[0,500000], category, ratings=0){

    let api = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    return async function fetchProductsThunk(dispatch, getState){

        dispatch(setStatus(STATUSES.LOADING));

        try {

            if(category){
                api = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }

            const { data } = await axios.get(`${api}`);

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