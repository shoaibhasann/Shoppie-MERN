import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../main";

const forgotSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        setLoading(state,action){
            state.loading = action.payload;
        },
        setError(state,action){
            state.error = action.payload;
        },
        setMessage(state,action){
            state.message = action.payload;
        },
        clearMessage(state,action){
            state.message = null;
        },
        clearErrors(state,action){
            state.error = null;
        }
    }
});

export function forgotPassword(email){
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };


    return async function forgotPasswordThunk(dispatch, getState){
        dispatch(setLoading(true));
        try {
            const { data } = await axios.post(`${server}/password/forgot`, email, config);
            dispatch(setLoading(false));
            dispatch(setMessage(data.message));
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.response.data));
            dispatch(clearMessage());
        }
    }
}

export const { setPassword, setLoading, setError, setMessage, clearErrors, clearMessage } = forgotSlice.actions;


export default forgotSlice.reducer;