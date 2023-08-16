// store.js
import { configureStore } from '@reduxjs/toolkit';
import DrawerNavSlice from './Slice/DrawerNavSlice';

const store = configureStore({
  reducer: {
    drawerNav: DrawerNavSlice,
  },
});

export default store;
