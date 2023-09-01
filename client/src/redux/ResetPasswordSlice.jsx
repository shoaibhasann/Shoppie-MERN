import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});


export function resetPassword(formData, token) {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const server = `http://localhost:8080/api/v1/password/reset/${token}`;

  return async function resetPasswordThunk(dispatch) {
    try {
      dispatch(setLoading(true));

      const { data } = await axios.put(server, formData, config);

      dispatch(setSuccess(data.success));
      dispatch(setMessage(data.message));
    } catch (error) {
      dispatch(setError(error.response.data));
    } finally {
      dispatch(setLoading(false));
    }
  };
}


export const { setLoading, setSuccess, clearErrors, setError, setMessage } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;