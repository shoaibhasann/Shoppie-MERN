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
    },
    setLoading(state,action){
      state.loading = action.payload
    },
    setAuthenticated(state,action){
      state.isAuthenticated = action.payload
    },
    setError(state,action){
      state.error = action.payload
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

        dispatch(setStatus(STATUSES.SUCCESS));

        dispatch(setAuthenticated(true));

       } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.response.data));
       }
  }
}

export const { setUser, setLoading, setAuthenticated, setError } = userSlice.actions;

export default userSlice.reducer;