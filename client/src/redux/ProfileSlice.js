import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../main";

const profileSlice = createSlice({
    name: 'profile',

    initialState: {
        profile: null,
        loading: false,
        isUpdated: false,
        error: null
    },

    reducers: {
        setProfile(state,action){
            state.profile = action.payload;
            state.error = null;
        },
        
        setLoading(state,action){
            state.loading = action.payload;
        },

        setIsUpdated(state,action){
            state.isUpdated = action.payload;
        },

        setError(state,action){
            state.error = action.payload;
        },

        clearErrors(state,action){
            state.error = null;
        },
        resetProfile(state,action){
            state.profile = null;
            state.error = null;
            state.isUpdated = false;
            state.loading = false;
        }
    }

});

// function to update user profile
export function updateProfile(userData){
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      return async function updateProfileThunk(dispatch,getState){
        dispatch(setLoading(true));
        try {
            const { data } = await axios.put(`${server}/me/update`, userData, config, );
            dispatch(setProfile(data));
            dispatch(setLoading(false));
            dispatch(setIsUpdated(true));
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setProfile(null));
            dispatch(setError(error.response.data));
        }
      }
}

// function to update password 
export function updatePassword(password){
          const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };

          return async function updatePasswordThunk(dispatch, getState){
             dispatch(setLoading(true));
             try {
               const { data } = await axios.put(`${server}/password/update`, password, config);
               dispatch(setProfile(data));
               dispatch(setLoading(false));
               dispatch(setIsUpdated(true));
             } catch (error) {
               dispatch(setLoading(false));
               dispatch(setProfile(null));
               dispatch(setError(error.response.data));
             }
          }
}



export const { setProfile, setLoading, setError, setIsUpdated, clearErrors, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;