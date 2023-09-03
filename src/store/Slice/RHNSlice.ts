import { createSlice } from '@reduxjs/toolkit';

const RHNSclice = createSlice({
  name: 'isRHNOpen',
  initialState: false,
  reducers: {
    toggleRHN : state => !state,
  },
});

export const { toggleRHN } = RHNSclice.actions;
export default RHNSclice.reducer;
