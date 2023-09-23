'use client'
import { configureStore } from '@reduxjs/toolkit';
import authTokenReducer from './reducers/authToken.reducer';

export const Store = configureStore({
    reducer: {
        authToken: authTokenReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;