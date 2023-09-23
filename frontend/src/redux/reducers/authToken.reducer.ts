'use client'
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

interface State {
    authToken?: string;
}

const initialState: State = {
    authToken: undefined
}

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.authToken
            }
        }
    }
})

export const { setAuthToken } = authTokenSlice.actions;


export default authTokenSlice.reducer;