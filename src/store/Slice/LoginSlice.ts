// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const isLoginOpen = createSlice({
  name: 'isLoginOpen',
  initialState: false,
  reducers: {
    toggleLogin : state => !state,
  },
});

export const { toggleLogin } = isLoginOpen.actions;
export default isLoginOpen.reducer;
