import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../main";


const adminReviewSlice = createSlice({
    name: 'adminReviews',

    initialState: {
        reviews: [],
        loading: false,
        error: null,
        isDeleted: false,
    },

    reducers: {

        // reducers function to get all reviews of product
        reviewsRequest(state,action){
            state.loading = true;
        },

        reviewsSuccess(state,action){
            state.loading = false;
            state.reviews = action.payload;
        },

        reviewsFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        reviewsReset(state,action){
            state.loading = false;
            state.reviews = [];
            state.error = null;
        },

        // reducers function to delete review
        deleteReviewRequest(state,action){
            state.loading = true;
        },

        deleteReviewSuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload;
        },

        deleteReviewFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        deleteReviewReset(state,action){
            state.loading = false;
            state.isDeleted = false;
            state.error = null;
        },

        clearErrors(state,action){
            state.error = null;
            state.loading = false;
        }
    }
});


const config = {  headers: { "Content-Type": "application/json" }, withCredentials: true };

// function to fetch all reviews of a product
export function fetchAllReviews(id){
    return async function fetchAllReviewsThunk(dispatch, getState){
        dispatch(reviewsRequest());
        try {
            const { data } = await axios.get(`${server}/products/reviews?id=${id}`, config);
            dispatch(reviewsSuccess(data.reviews));
        } catch (error) {
            dispatch(reviewsFail(error.response.data.message));
        }
    }
}

// function to delete review
export function deleteReview(reviewId, productId){
    return async function deleteReviewThunk(dispatch, getState){
        dispatch(deleteReviewRequest());
        try {
            const { data } = await axios.delete(`${server}/products/review?id=${reviewId}&productId=${productId}`, config);
            dispatch(deleteReviewSuccess(data));
        } catch (error) {
            dispatch(deleteReviewFail(error.response.data.message));
        }
    }
}

export const {reviewsRequest, reviewsSuccess, reviewsFail, reviewsReset, deleteReviewFail, deleteReviewRequest, deleteReviewReset, deleteReviewSuccess, clearErrors } = adminReviewSlice.actions;

export default adminReviewSlice.reducer;