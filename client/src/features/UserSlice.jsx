import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
  name: "user",

  initialState: {
    userInfo: {},
    loading: false,
    isAuthenticated: false,
    error: null,
  },

  reducers: {
    setUser(state, action){
        state.userInfo = action.payload
        state.error = null
    },
    setLoading(state,action){
      state.loading = action.payload
    },
    setAuthenticated(state,action){
      state.isAuthenticated = action.payload
    },
    setError(state,action){
      state.error = action.payload
    },
    clearError(state,action){
      state.error = null
    }
  }
});

export function login(email,password) {

  const payload = {
    email,
    password
  };

  const config = { headers: { "Content-Type" : "application/json"}};

  const server = "http://localhost:8080/api/v1/login";

  return async function loginThunk(dispatch, getState){
    dispatch(setLoading(true));
       try {
        const { data } = await axios.post(server, payload, config);

        dispatch(setUser(data));

        dispatch(setLoading(false));

        dispatch(setAuthenticated(true));

       } catch (error) {
        dispatch(setLoading(false));
        dispatch(setUser({}));
        dispatch(setError(error.response.data));
       }
  }
}

export function register(userData) {

  const config = { headers: { "Content-Type" : "application/json"}};

  const server = "http://localhost:8080/api/v1/register";

  return async function loginThunk(dispatch, getState){
    dispatch(setLoading(true));
       try {
        const { data } = await axios.post(server, userData, config);

        dispatch(setUser(data));

        dispatch(setLoading(false));

        dispatch(setAuthenticated(true));

       } catch (error) {
        dispatch(setLoading(false));
        dispatch(setUser({}));
        dispatch(setError(error.response.data));
       }
  }
}

export const { setUser, setLoading, setAuthenticated, setError, clearError } = userSlice.actions;

export default userSlice.reducer;