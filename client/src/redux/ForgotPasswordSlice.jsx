import { createSlice } from "@reduxjs/toolkit";

const forgotSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        password: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        setPassword(state,action){
            state.password = action.payload;
            state.error = null;
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
        setError(state,action){
            state.error = action.payload;
        },
        setMessage(state,action){
            state.message = action.payload;
        },
        clearErrors(state,action){
            state.error = null;
        }
    }
});

export const { setPassword, setLoading, setError, setMessage, clearErrors } = forgotSlice.actions;


export default forgotSlice.reducer;