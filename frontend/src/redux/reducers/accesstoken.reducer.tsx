import { createSlice } from '@reduxjs/toolkit';

interface IState {
    accessToken?: string
}

const initialState: IState = {
    accessToken: undefined
}

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;