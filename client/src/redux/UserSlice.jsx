import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../main";


const userSlice = createSlice({
  name: "user",

  initialState: {
    userInfo: null,
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

// login function
export function login(email, password) {
  const payload = {
    email,
    password,
  };

  const config = {  headers: { "Content-Type": "application/json" }, withCredentials: true };

  return async function loginThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${server}/login`, payload, config);

      dispatch(setUser(data.user));

      dispatch(setLoading(false));

      dispatch(setAuthenticated(true));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setUser(null));
      dispatch(setError(error.response.data));
    }
  };
}

// register function
export function register(userData) {

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function registerThunk(dispatch, getState){
    dispatch(setLoading(true));
       try {
        const { data } = await axios.post(`${server}/register`, userData, config);

        dispatch(setUser(data.user));

        dispatch(setLoading(false));

        dispatch(setAuthenticated(true));

       } catch (error) {
        dispatch(setLoading(false));
        dispatch(setUser(null));
        dispatch(setError(error.response.data));
       }
  }
}

// get profile function
export function getUserProfile() {

  return async function getUserProfileThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${server}/me`, {withCredentials: true});
      if (data.user) {
        dispatch(setUser(data.user));
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setUser(null));
      dispatch(setAuthenticated(false));
      dispatch(setError(error.response.data));
    }
  };
}

// logout funciton
export function logout() {

  return async function logoutThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${server}/logout`, { withCredentials: true });
      dispatch(setUser(null));
      dispatch(setLoading(false));
      dispatch(setAuthenticated(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response.data));
    }
  };
}

export const { setUser, setLoading, setAuthenticated, setError, clearError } = userSlice.actions;

export default userSlice.reducer;