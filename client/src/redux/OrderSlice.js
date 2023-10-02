import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./ProductSlice";
import axios from "axios";
import { server } from "../main";



const orderSlice = createSlice({
    name: 'newOrder',

    initialState: {
        orders: [],
        status: STATUSES.IDLE,
        loading: false,
        error: null
    },

    reducers: {

        createOrderRequest(state,action){
            state.loading = true;
            state.status = STATUSES.LOADING
        },

        createOrderSuccess(state,action){
            state.loading = false,
            state.status = STATUSES.SUCCESS
            state.orders.push(action.payload);
        },

        createOrderFail(state,action){
            state.loading = true,
            state.status = STATUSES.FAIL,
            state.error = action.payload
        },

        clearErrors(state,action){
            state.loading = false,
            state.status = STATUSES.IDLE
            state.orders = [],
            state.error = null
        }
    }

});

export function createNewOrder(order){

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return async function createNewOrderThunk(dispatch, getState){
        dispatch(createOrderRequest());

        try {
            const { data } = await axios.post(`${server}/orders`, order, config);

            dispatch(createOrderSuccess(data));

        } catch (error) {
            console.log(error);
            dispatch(createOrderFail(error.response.data.message));
        }
    }
}

export const { createOrderRequest, createOrderSuccess, createOrderFail, clearErrors } = orderSlice.actions;

export default orderSlice.reducer;