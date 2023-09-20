import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./ProductSlice";
import axios from "axios";
import { server } from "../main";


const reviewSlice = createSlice({
    name: 'newReview',

    initialState: {
        review: null,
        loading: false,
        error: null,
        status: STATUSES.IDLE
    },

    reducers: {
        newReviewRequest(state,action){
            state.loading = true;
            state.status = STATUSES.LOADING;
        },

        newReviewSuccess(state,action){
            state.loading = false;
            state.status = STATUSES.SUCCESS;
            state.review = action.payload
        },

        newReviewFail(state,action){
            state.loading = false;
            state.status = STATUSES.FAIL;
            state.error = action.payload;
        },

        newReviewReset(state,action){
            state.loading = false;
            state.status = STATUSES.IDLE;
            state.error = null;
            state.review = null;
        }
    }
});


export function addNewReview(reviewData){
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    return async function createNewReviewThunk(dispatch,getState){
        dispatch(newReviewRequest());

        try {
            const { data } = await axios.put(`${server}/products/review`, reviewData, config);
            dispatch(newReviewSuccess(data));

        } catch (error) {
            dispatch(newReviewFail(error.response.data.message));
        }
    }
}


export const { newReviewRequest, newReviewSuccess, newReviewFail, newReviewReset } = reviewSlice.actions;

export default reviewSlice.reducer;