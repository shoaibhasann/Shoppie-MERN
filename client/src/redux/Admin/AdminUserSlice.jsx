import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../main";

const adminUserSlice = createSlice({
  name: "users",

  initialState: {
    user: {},
    users: [],
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated: false,
  },

  reducers: {
    // reducers function to get all users
    getUsersRequest(state, action) {
      state.loading = true;
    },

    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    getUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUsersReset(state, action) {
      state.loading = false;
      state.users = [];
      state.error = null;
    },

    // reducers function to get current user
    getUserRequest(state, action) {
      state.loading = false;
    },

    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },

    getUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserReset(state, action) {
      state.loading = false;
      state.user = {};
      state.error = null;
    },

    // reducers function to delete user
    deleteUserRequest(state, action) {
      state.loading = true;
    },

    deleteUserSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },

    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserReset(state, action) {
      state.loading = false;
      state.error = null;
      state.isDeleted = false;
    },

    // reducers function to update user info
    updateUserRequest(state, action) {
      state.loading = true;
    },

    updateUserSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updateUserFail(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserReset(state, action) {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    },
  },
});

const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

// function to get all users
export function getAllUsers() {
  return async function getAllUsersThunk(dispatch, getState) {
    dispatch(getUsersRequest());
    try {
      const { data } = await axios.get(`${server}/admin/users`, config);
      dispatch(getUsersSuccess(data.users));
    } catch (error) {
      dispatch(getUsersFail(error.response.data.message));
    }
  };
}

// function to get current user
export function getCurrentUser(id) {
  return async function getCurrentUserThunk(dispatch, getState) {
    dispatch(getUserRequest());
    try {
      const { data } = await axios.get(`${server}/admin/user/${id}`, config);

      dispatch(getUserSuccess(data.user));
    } catch (error) {
      dispatch(getUserFail(error.response.data.message));
    }
  };
}

// function to update user info
export function updateUserRole(id, userData) {
  return async function updateUserRole(dispatch, getState) {
    dispatch(updateUserRequest());

    try {
      const { data } = await axios.put(`${server}/admin/user/${id}`, userData, config);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
    }
  };
}

// function to delete user
export function deleteUser(id) {
  return async function deleteUserThunk(dispatch, getState) {
    dispatch(deleteUserRequest());

    try {
      const { data } = await axios.delete(`${server}/admin/user/${id}`, config);
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFail(error.response.data.message));
    }
  };
}

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFail,
  getUsersReset,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  getUserReset,
  updateUserFail,
  updateUserRequest,
  updateUserReset,
  updateUserSuccess,
  deleteUserFail,
  deleteUserRequest,
  deleteUserReset,
  deleteUserSuccess,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
