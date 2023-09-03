// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const isDrawerNavOpen = createSlice({
  name: 'drawerNav',
  initialState: false,
  reducers: {
    toggleDrawer : (state, action) => {
      return action.payload; 
    },
  },
});

export const { toggleDrawer } = isDrawerNavOpen.actions;
export default isDrawerNavOpen.reducer;
