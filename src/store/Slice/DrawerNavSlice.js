// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const isDrawerNavOpen = createSlice({
  name: 'drawerNav',
  initialState: false,
  reducers: {
    toggleDrawer : state => !state,
  },
});

export const { toggleDrawer } = isDrawerNavOpen.actions;
export default isDrawerNavOpen.reducer;
