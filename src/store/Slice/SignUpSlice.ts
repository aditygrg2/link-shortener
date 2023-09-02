import { createSlice } from '@reduxjs/toolkit';

const isSignUpOpen = createSlice({
  name: 'isSignUpOpen',
  initialState: false,
  reducers: {
    toggleSignUp : state => !state,
  },
});

export const { toggleSignUp } = isSignUpOpen.actions;
export default isSignUpOpen.reducer;
